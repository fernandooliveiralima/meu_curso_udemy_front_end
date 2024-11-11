
import { defineStore, storeToRefs } from 'pinia';
import dayjs from 'dayjs';
import { useAuthStore } from '@/stores/auth/authStore';
import type { TransactionResponse } from '@/types/asyncDataTypes/transactionResponse';
import type { transactionType } from '@/types/transactions/transactionType';
import { filterListByTime } from '@/composables/dateFilterComp';
import { useToast } from 'vue-toastification';

export const useTransactionsStore = defineStore('transactionsStore', () => {

  const authStoreInstance = useAuthStore();
  const {tokenCookie} = storeToRefs(authStoreInstance);

  let filteredList = ref< Array<transactionType> >([]);
  const dayjsInstance = computed(()=> dayjs());

  const formAddTransactions = reactive<transactionType>({
    id:0,
    transaction_name: '',
    transaction_date: dayjsInstance.value.format('YYYY-MM-DD'),
    transaction_category: 'General',
    transaction_amount: undefined,
    transaction_type: 'income'
  });

  let containerAllTransactions = ref< Array<transactionType> >([
    /* {
      id:0,
      transaction_name: 'Freelnacer',
      transaction_date: '2023-02-28',
      transaction_category: 'General',
      transaction_amount: 650,
      transaction_type: 'income'
      
    },

    {
      id:1,
      transaction_name: 'salario',
      transaction_date: '2024-02-23',
      transaction_category: 'General',
      transaction_amount: 3000,
      transaction_type: 'income',
    },

    {

      id:3,
      transaction_name: 'conta',
      transaction_date: '2023-02-28',
      transaction_category: 'General',
      transaction_amount: -78,
      transaction_type: 'expense'
      
    }, */
  ]);

  /* Crud Actions */

  /* Add Transactions */
  const addTransactions = async (transaction: transactionType)=>{
    try {
      const toast = useToast();
      const response: TransactionResponse = await $fetch('http://localhost:8000/api/transactions', {
        method:'POST',
        body:transaction,
        headers:{
          'Authorization':`Bearer ${tokenCookie.value}`,
          'Accept':'application/json'
        }
      });

      containerAllTransactions.value.unshift(response);
      updateFilteredList();
      toast.success('Transaction Added')
    } catch (error) {
      const toast = useToast();
      toast.error('Error Added Transaction');
    }
  };
  /* Add Transactions */

  /* load all transactions */
  const loadAllTransactions = async ()=>{
    try {
      const response: Array<TransactionResponse> = await $fetch('http://localhost:8000/api/transactions', {
        method:'GET',
        headers:{
          'Authorization':`Bearer ${tokenCookie.value}`,
          'Accept':'application/json'
        }
      });

      containerAllTransactions.value = response;
      updateFilteredList();
      
    } catch (error) {
      
    }
  };
  /* load all transactions */
  
 
    //Update Transactions
    const currentTransaction = ref<transactionType | null>(null); // Para armazenar a transação sendo editada
                  
    const editTransaction = (transaction: transactionType) => {
        currentTransaction.value = { ...transaction }; // Copiar a transação selecionada para edição
    };

    const updateTransaction = async () => {
        if (currentTransaction.value) {
          const toast = useToast();
            // Validação de acordo com o tipo de transação
            if (
                (currentTransaction.value.transaction_type === 'income' 
                    && Number(currentTransaction.value.transaction_amount) < 0) ||
                    
                (currentTransaction.value.transaction_type === 'expense' 
                    && Number(currentTransaction.value.transaction_amount) > 0)
            ) {
                toast.error('The Value and Type Must Be the Same!');
                //console.error('O valor da transação não condiz com o tipo.');
                return; // Impede a continuação da submissão se a validação falhar
            }

            try {
                const response: TransactionResponse = await $fetch(`http://localhost:8000/api/transactions/${currentTransaction.value.id}`, {
                    method: 'PUT',
                    body: currentTransaction.value,
                    headers: {
                        'Authorization': `Bearer ${tokenCookie.value}`,
                        'Accept': 'application/json'
                    }
                });

                // Atualiza a lista local após sucesso
                const index = containerAllTransactions.value.findIndex(item => item.id === currentTransaction.value!.id);
                if (index !== -1) {
                    containerAllTransactions.value[index] = { ...currentTransaction.value };
                    updateFilteredList(); // Atualizar a lista filtrada
                    currentTransaction.value = null; // Limpar após edição
                }

                toast.info('Transaction Edited!');
                //console.log('Transaction updated successfully:', response);
            } catch (error) {
                //console.error('Error updating transaction:', error);
            }
        }
    };
  /* Update Transactions */

  /* Remove Transactions */
  const removeTransactions = async (id: number)=>{
    const toast = useToast();
    try {
      await $fetch(`http://localhost:8000/api/transactions/${id}`, {
        method:'DELETE',
        headers:{
          'Authorization':`Bearer ${tokenCookie.value}`,
          'Accept':'application/json'
        }
      });

      containerAllTransactions.value = containerAllTransactions.value.filter(item => item.id !== id);
      filteredList.value = filteredList.value.filter(item => item.id !== id);
      updateFilteredList();
      toast.success('Transaction Removed');
    } catch (error) {
      console.log(error)
    }
  };
  /* Remove Transactions */

  
  /* Crud Actions */
  
  /* Computed Amounts */
  const totalTransactions = computed(()=>{
    const totalValue = filteredList.value.length > 0
      ? filteredList.value
      .map((item) => item.transaction_amount)
      .reduce((acc, amount) => Number(acc) + Number(amount), 0) : 0
      return Number(totalValue);
  });

  const incomes = computed(()=>{
    const incomesValue = filteredList.value
    .filter((amount) => Number(amount.transaction_amount) > 0)
    .map((income) => income.transaction_amount)
    .reduce((acc, income) => Number(acc) + Number(income),0)
    return Number(incomesValue);
  })

  const expenses = computed(()=>{
    const expensesValue = filteredList.value
    .filter((amount) => Number(amount.transaction_amount) < 0)
    .map((expense) => expense.transaction_amount)
    .reduce((acc, expense) => Number(acc) + Number(expense),0)
    return Number(expensesValue);
  })
  /* Computed Amounts */
  
  const updateFilteredList = ()=>{
    return filteredList.value = filterListByTime(formAddTransactions.transaction_date, 
      containerAllTransactions.value)
  };

  const formatAmounts = (amount: number)=>{
    return new Intl.NumberFormat('en-US', {style: 'currency', currency:'USD'}).format(amount);
  }

    const percentualColor = computed(()=>{
      let copyFilteredList = [...filteredList.value];
      if(copyFilteredList.length === 0){return 'expense'};
      const firstTransaction = copyFilteredList[0]

      if( Number(firstTransaction.transaction_amount) > 0 ){
        return 'income';
      }else if(Number(firstTransaction.transaction_amount) < 0){
        return 'expense';
      }

      return firstTransaction;
    });

    const calculatePercentual = computed(()=>{
      if(incomes.value === 0){return 0;}

      const percentual = ( Number(incomes.value) - Math.abs( Number(expenses.value) )) / Number(incomes.value) * 100;
      return Math.max(0, Math.min(100, parseInt(`${percentual}`)))
    });

    const transactionColor = (transaction: transactionType)=>{
      return Number(transaction.transaction_amount) > 0 ? 'income' : 'expense';
    };

  watch([containerAllTransactions, ()=> formAddTransactions.transaction_date], ()=>{
    updateFilteredList();
  });

  return{
    filteredList,
    formAddTransactions,
    containerAllTransactions,
    totalTransactions,
    incomes,
    expenses,
    percentualColor,
    calculatePercentual,
    currentTransaction,

    addTransactions,
    loadAllTransactions,
    updateTransaction,
    editTransaction,
    removeTransactions,
    updateFilteredList,
    formatAmounts,
    transactionColor
  }

});

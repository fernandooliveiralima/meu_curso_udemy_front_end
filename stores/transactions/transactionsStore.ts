
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

  const formAddTransactions = reactive<transactionType>({
    id:0,
    transaction_name: '',
    transaction_date: dayjs().format('YYYY-MM-DD'),
    transaction_category: 'General',
    transaction_amount: undefined,
    transaction_type: 'income'
  });

  let containerAllTransactions = ref< Array<transactionType> >([
    {
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
      
    },
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
      console.log('loadAllTransactions() store ->', response);
    } catch (error) {
      
    }
  };
  /* load all transactions */
  

  /* Crud Actions */

  return{
    filteredList,
    formAddTransactions,
    containerAllTransactions,

    addTransactions,
    loadAllTransactions
  }

});

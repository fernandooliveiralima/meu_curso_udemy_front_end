<script setup lang="ts">
import {storeToRefs} from 'pinia';
import { useToast } from 'vue-toastification';
import {useTransactionsStore} from '@/stores/transactions/transactionsStore';

const transactionsStoreInstance = useTransactionsStore();
const {
  formAddTransactions,
  containerAllTransactions
} = storeToRefs(transactionsStoreInstance);

const toast = useToast();

const saveTransaction = ()=>{
  if(formAddTransactions.value.transaction_name === '' || formAddTransactions.value.transaction_amount === undefined){
    toast.error('Fill The Fields');
    return;
  }else if(formAddTransactions.value.transaction_type === 'expense'){
    formAddTransactions.value.transaction_amount *= -1;
  }

  const transaction = {
    id: formAddTransactions.value.id++,
    transaction_name: formAddTransactions.value.transaction_name,
    transaction_date: formAddTransactions.value.transaction_date,
    transaction_category: formAddTransactions.value.transaction_category,
    transaction_amount: formAddTransactions.value.transaction_amount,
    transaction_type: formAddTransactions.value.transaction_type,
  }

  transactionsStoreInstance.addTransactions(transaction);

  formAddTransactions.value.transaction_name = '';
  formAddTransactions.value.transaction_amount = undefined;
  formAddTransactions.value.transaction_type = 'income';

  console.log('container transactions', containerAllTransactions.value);
}
</script>

<template>
  <div>

    <form @submit.prevent="saveTransaction" class="form-transactions">

      <div class="title-transactionsType">
        <span class="title">Form Transactions</span>
        <div class="inputs-transactionsType">
          <div class="section-income">
            <label 
              class="income-label" 
              for="income">Income</label>

            <input 
              class="income-input" 
              type="radio" 
              name="income" 
              id="income" 
              value="income"
              v-model="formAddTransactions.transaction_type" />
          </div>

          <div class="section-expense">
            <label 
              class="expense-label" 
              for="expense">Expense</label>

            <input 
              class="expense-input" 
              type="radio" 
              name="expense" 
              id="expense" 
              value="expense"
              v-model="formAddTransactions.transaction_type"/>
          </div>

        </div>
      </div>


      <div class="form-fields">

        <div class="form-inputs">
          <label for="name">Description</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            placeholder="description"
            v-model="formAddTransactions.transaction_name"/>
        </div>

        <div class="form-inputs">
          <label for="amount">Amount</label>
          <input 
            type="number" 
            name="amount" 
            id="amount" 
            placeholder="Amount" 
            min="0" 
            step="0.01"
            v-model.number="formAddTransactions.transaction_amount"/>
        </div>

        <div class="form-inputs">
          <label for="date">Date</label>
          <input 
            type="date" 
            name="date" 
            id="date" 
            v-model="formAddTransactions.transaction_date"/>
        </div>

      </div>
      <button class="w-full" type="submit">
        Add Transaction
      </button>
    </form>

  </div>
</template>


<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .form-transactions {
    @apply 
    bg-slate-700 
    mt-16 
    ml-3 rounded-md;
  }

  .title-transactionsType{
    @apply
    w-full flex items-center justify-between;
  }

  .title{
    @apply 
    font-sans
    font-semibold 
    text-3xl;
  }

  .inputs-transactionsType{
    @apply
    w-64 flex items-center justify-between;
  }

  .income-label{
    @apply
    font-sans
    text-2xl 
    text-green-600 font-semibold;
  }
  .income-input{
    @apply
    ml-1 accent-green-600;
  }

  .expense-label{
    @apply
    font-sans
    text-2xl 
    text-red-600 font-semibold;
  }
  .expense-input{
    @apply
    ml-1 accent-red-600;
  }

  .form-fields{
    @apply
    w-[70rem] 
    flex items-center justify-between;
  }

  form {
    @apply 
    h-[20rem] 
    flex flex-col items-start justify-between 
    px-10 py-3;
  }

  .form-inputs {
    @apply flex flex-col;
  }

  .form-inputs>label {
    @apply 
    font-sans
    text-white text-lg 
    font-semibold;
  }

  .form-inputs>input {
    @apply w-64 
    bg-slate-500 
    p-1 
    outline-none 
    rounded-md 
    mt-1;
  }

  form>button {
    @apply 
    bg-blue-700 
    px-16 py-1 
    rounded-md font-semibold 
    font-sans
    text-white text-lg;
  }
}

@layer utilities {
  .form-inputs>input {
    @apply 
    placeholder:text-black
    placeholder:font-sans;
  }
}
</style>
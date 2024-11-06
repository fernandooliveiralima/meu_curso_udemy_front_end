<script setup lang="ts">
definePageMeta({
  middleware:'auth'
});

import inputDateInfoC from '~/components/transactions/inputDateInfoC.vue';
import tableInfoC from '~/components/transactions/tableInfoC.vue';

import {useTransactionsStore} from '@/stores/transactions/transactionsStore';
const transactionsStoreInstance = useTransactionsStore();

onMounted( async ()=>{
  await transactionsStoreInstance.loadAllTransactions();
});
</script>
  
<template>
  <div class="transactions-body">
    <navBarC/>
    
    <section class="transactions-list">
      <div>
        <inputDateInfoC/>
        <tableInfoC/>
      </div>
    </section>
  </div>
</template>
  
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.transactions-body {
  @apply h-screen bg-slate-800;
}

.transactions-list {
  @apply 
  w-full 
  mt-24 
  flex flex-col items-center justify-between;
}
</style>
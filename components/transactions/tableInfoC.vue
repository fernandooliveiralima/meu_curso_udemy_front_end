<script setup lang="ts">
import {storeToRefs} from 'pinia';
  import type {transactionType} from '@/types/transactions/transactionType';

  import editInfoC from './editInfoC.vue';
  import removeInfoC from './removeInfoC.vue';
  import editTransactionsFormC from './editTransactionsFormC.vue';

  import {useTransactionsStore} from '@/stores/transactions/transactionsStore';
  const transactionStoreInstance = useTransactionsStore();
  const { filteredList } = storeToRefs(transactionStoreInstance);

  // Estado para controlar a exibição do modal
  const isModalOpen = ref(false);

  
</script>
  
<template>
  <div>
    <section class="container-list">
      <div class="header-list">
        <span>Description</span>
        <span>Date</span>
        <span>Amount</span>
        <span>Category</span>
        <span>Type</span>
        <span>Actions</span>
      </div>

      <div v-for="iterator in filteredList" class="table-content">
        <div class="description-container">
          <p class="description">
            {{ iterator.transaction_name }}
          </p>
        </div>

        <div class="date-container">
          {{ iterator.transaction_date }}
        </div>

        <span class="amount-style">
          {{ iterator.transaction_amount }}
        </span>

        <span class="category-container">
          {{ iterator.transaction_category }}
        </span>

        <span class="type-style">
          {{ iterator.transaction_type }}
        </span>

        <div class="container-actions">
          <span class="edit-container">
            <editInfoC></editInfoC>
          </span>
          <span class="remove-container">
            <removeInfoC></removeInfoC>
          </span>
        </div>
      </div>
    </section>

    <!-- Modal de Edição -->
    <div v-if="isModalOpen" class="modal-container">
      <div class="modal-overlay modal-overlay-config"></div>
      <div class="body-modal body-modal-config">
        <editTransactionsFormC /> <!-- Componente do formulário de edição -->
      </div>
    </div>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.container-list{
  @apply
  mt-10 overflow-y-auto max-h-96;
}

.header-list{
  @apply
  w-[100rem] 
  bg-slate-700 
  font-sans
  p-3 
  text-2xl font-semibold 
  rounded-md 
  flex items-center justify-between;
}

.table-content {
  @apply 
  bg-slate-600 
  flex items-center justify-between
  font-sans
  rounded-md 
  mt-20 
  py-3 px-3;
}
.table-content > span {
  @apply text-xl;
}

.description-container{
  @apply
  max-w-44 overflow-x-auto;
}
.description{
  @apply
  text-xl whitespace-nowrap;
}

.date-container{
  @apply  text-xl;
}

.category-container{
  @apply text-xl;
}

.income {
  @apply text-green-600;
}
.expense {
  @apply text-red-600;
}

.amount-style {
  @apply font-semibold;
}

.type-style {
  @apply font-semibold;
}

.container-actions{
  @apply  flex flex-col text-xl;
}

.edit-container{
  @apply  text-base cursor-pointer;
}

.remove-container{
  @apply  text-base mt-5 cursor-pointer;
}

.modal-container{
  @apply  
  fixed inset-0 
  flex items-center justify-center 
  z-50;
}

.modal-overlay {
  @apply fixed inset-0 bg-gray-600 opacity-75;
}
.modal-overlay-config{
  @apply
  bg-black opacity-50 absolute inset-0;
}

.body-modal {
  @apply relative p-4 w-96 rounded shadow-lg;
}
.body-modal-config{
  @apply
  p-6 rounded-lg z-50;
}
</style>
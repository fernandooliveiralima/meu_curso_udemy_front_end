<script setup lang="ts">
definePageMeta({
  middleware:'auth'
});

import infoCardsC from '@/components/transactions/infoCardsC.vue';
import lineChartC from '@/components/transactions/lineChartC.vue';
import formTransactionsC from '@/components/transactions/formTransactionsC.vue';
import doughnutChartC from '@/components/transactions/doughnutChartC.vue';

import {useTransactionsStore} from '@/stores/transactions/transactionsStore';
const transactionsStoreInstance = useTransactionsStore();

onMounted( async ()=>{
  await transactionsStoreInstance.loadAllTransactions();
});
</script>

<template>
  <div>
    <navBarC />
    <section class="transactions-components">
      <div class="cards-lineChart">
        <infoCardsC />
        <lineChartC />
      </div>

      <div class="form-donut">
        <formTransactionsC/>
        <doughnutChartC/>
      </div>
    </section>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .transactions-components {
    @apply flex flex-col items-center;
  }

  .cards-lineChart {
    @apply w-full flex items-center justify-between;
  }

  .form-donut{
    @apply
    w-full
    flex items-center justify-between;
  }

}

</style>
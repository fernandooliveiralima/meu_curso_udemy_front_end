<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useTransactionsStore} from '@/stores/transactions/transactionsStore';
const transactionsSroreInstance = useTransactionsStore();
const {calculatePercentual, percentualColor} = storeToRefs(transactionsSroreInstance);
</script>
  
<template>
  <div class="percentual-container">
  
    <section v-bind:class=" `percentual-style ${percentualColor}` ">
      {{ calculatePercentual }}
      <span>%</span>
    </section>

  </div>
</template>
  
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
  
@layer components{
  .percentual-container{
    @apply absolute top-40;
  }

  .percentual-style{
    @apply
    text-6xl
    font-semibold
    font-sans
    flex items-end;
  }
  .percentual-style span{
    @apply
    font-semibold
    text-5xl;
  }

  .income{
    @apply text-[green];
  }
  .expense{
    @apply text-[crimson];
  }
}
</style>
<script setup lang="ts">
  import infoCardsC from '@/components/transactions/infoCardsC.vue';
  
</script>
  
<template>
  <div>
    <navBarC/>
    <section class="transactions-components">
      <div class="cards-lineChart">
        <infoCardsC/>
        </div>
    </section>
  </div>
</template>
  
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
  
@layer components{
  .transactions-components{
    @apply flex flex-col items-center;
  }

  .cards-lineChart{
    @apply
    w-full
    flex items-center justify-between;
  }

};
</style>
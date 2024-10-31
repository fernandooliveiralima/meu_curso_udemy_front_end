<script setup lang="ts">
  
</script>
  
<template>
  <div class="percentual-container">
  
    <section class="percentual-style">
      100
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
    text-[green]
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
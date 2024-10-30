<script setup lang="ts">
  import registerFormC from '@/components/auth/registerFormC.vue';
</script>
  
<template>
  <div class="register-body">

    <div class="register-content">
      <registerFormC/>
    </div>
  
  </div>
</template>
  
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
  
@layer components{
  .register-content{
    @apply
    min-h-screen
    flex items-center justify-center;
  }
};
</style>
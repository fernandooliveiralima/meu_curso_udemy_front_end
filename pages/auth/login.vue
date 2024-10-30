<script setup lang="ts">
  import loginFormC from '@/components/auth/loginFormC.vue'
</script>
  
<template>
  <div class="login-body">
    <div class="login-content">
      <loginFormC/>
    </div>
  </div>
</template>
  
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
  
@layer components{
  .login-content{
    @apply
    min-h-screen
    flex items-center justify-center;
  }
};
</style>
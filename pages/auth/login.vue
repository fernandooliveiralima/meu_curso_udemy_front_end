<script setup lang="ts">
  import loginFormC from '@/components/auth/loginFormC.vue';

  import {useAuthStore} from '@/stores/auth/authStore';
  const authStoreInstance = useAuthStore();
  const {user, userCookie} = storeToRefs(authStoreInstance);

  /* onMounted(()=>{
    console.log('login ->', user.value)
  }) */
</script>
  
<template>
  <div class="login-body">
    <navBarC/>
    <div class="login-content">
      <loginFormC/>
      <!--  -->
    </div>

  </div>
</template>
  
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
  
@layer components{

  .login-body{
    @apply flex flex-col;
  }

  .login-content{
    @apply
    h-[calc(100vh-4rem)]
    flex flex-col items-center justify-center;
  }
};
</style>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import {useAuthStore} from '@/stores/auth/authStore';
  import userC from '@/components/auth/userC.vue';

  const authStoreInstance = useAuthStore();
  const {userCookie, tokenCookie} = storeToRefs(authStoreInstance);

</script>
  
<template>
  <div class="navbar-body">
  
    <ul class="list-container">
      <div class="logo-menu">

        <div class="logo-container">Logo</div>
  
        <section class="navbar-content">
          <div class="list-items">
            <li>
              <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li v-if="!userCookie">
              <NuxtLink to="/auth/login">Login</NuxtLink>
            </li>
            <li v-if="!userCookie">
              <NuxtLink to="/auth/register">Register</NuxtLink>
            </li>
            <li @click="authStoreInstance.logout()">
              <NuxtLink>Logout</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/dashboard">Dashboard</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/transactions">Transactions</NuxtLink>
            </li>
          </div>
        </section>

      </div>
      <li class="user-section">
        <small v-if="userCookie && tokenCookie" class="user-name">{{ userCookie.name }}</small>
        <div class="user-icon"> <userC/> </div>
      </li>

    </ul>

  </div>
</template>
  
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
  
@layer components{
  .list-container{
    @apply
    h-16 w-full
    bg-slate-600
    flex items-center justify-between;
  }

  .logo-menu{
    @apply
    w-[80%]
    flex items-center justify-between;
    }

  .logo-container{
    @apply
    text-3xl
    font-sans
    font-semibold
    ml-8;
  }

  .navbar-content{
    @apply
    w-[50%]
    mr-8
    flex items-center justify-between
    font-sans font-semibold 
    text-xl;
  }

  .list-items{
    @apply
    text-black
    w-full
    flex items-center justify-between;
  }
  .list-items li{
    @apply cursor-pointer;
  }

  .user-section{
    @apply
    w-40
    flex items-center justify-between
    px-3;
  }
  .user-name{
    @apply
    font-sans
    font-semibold
    text-lg;
  }

};
</style>
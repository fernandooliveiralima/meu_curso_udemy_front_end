<script setup lang="ts">
  import userC from '@/components/auth/userC.vue';
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
            <li>
              <NuxtLink to="/auth/login">Login</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/auth/register">Register</NuxtLink>
            </li>
            <li>
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
        <small class="user-name">Fernando</small>
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
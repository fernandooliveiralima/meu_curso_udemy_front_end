<script setup lang="ts">
  
</script>
  
<template>
  <div class="navbar-body">
  
    <ul class="list-container">
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

      <!-- <li class="user-section">
        <small>Fernando</small>
        <small>User Icon</small>
      </li> -->
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
    w-[80%]
    flex items-center justify-between;
  }

  .user-section{
    @apply
    w-[10%]
    flex items-center justify-between;
  }

};
</style>
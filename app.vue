<script setup lang="ts"></script>

<template>
  <div>
    
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  div{
    @apply min-h-screen bg-slate-800;
  }
}

</style>

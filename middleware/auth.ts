import { useAuthStore } from '@/stores/auth/authStore';
import { storeToRefs } from 'pinia';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStoreInstance = useAuthStore();
  const {tokenCookie} = storeToRefs(authStoreInstance);

  // Se o usuário já estiver logado e tentar acessar a página de login
  if (tokenCookie.value && to.path === '/auth/login') {
    return navigateTo('/dashboard'); // Redireciona para o dashboard ou outra rota adequada
  }

  // Se o usuário já estiver logado e tentar acessar a página de registro
  if (tokenCookie.value && to.path === '/auth/register') {
    return navigateTo('/dashboard'); // Redireciona para o dashboard ou outra rota adequada
  }

  //se o usuario não estiver autenticado e tentar acessar uma rota protegida, exceto o registro
  if(!tokenCookie.value && to.path !== '/auth/login' && to.path !== '/auth/register'){
    return navigateTo('/auth/login');
  }
});
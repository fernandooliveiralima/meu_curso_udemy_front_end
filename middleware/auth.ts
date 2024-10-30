import {useAuthStore} from '@/stores/auth/authStore';
import {storeToRefs} from 'pinia';

export default defineNuxtRouteMiddleware((to, from)=>{

  const authStoreInstance = useAuthStore();
  const {token} = storeToRefs(authStoreInstance);

  //se o usuario estiver logado e tentar acessar o login
  if(token.value && to.path === '/auth/login'){
    return navigateTo('/dashboard');
  }

  //se o usuario estiver logado e tentar acessar o registro
  if(token.value && to.path === '/auth/register'){
    return navigateTo('/dashboard');
  }

})
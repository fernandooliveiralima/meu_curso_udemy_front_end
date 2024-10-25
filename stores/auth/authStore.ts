import {defineStore} from 'pinia';
import {useCookie} from '#app';
import type {UserRegister} from '@/types/auth/registerType';

export const useAuthStore = defineStore('authStore', ()=>{

  let user = ref( useCookie('user', {maxAge: 60*60*24*7 } ) ); //expiração em 7 dias
  let token = ref( useCookie('token', {maxAge: 60*60*24*7 } )); //expiração em 7 dias

  const register = async (userRegister: UserRegister)=>{
    try {
      const response: any = await $fetch('http://localhost:8000/api/register', {
        method:'POST',
        body:userRegister
      })
      
      user.value = response
      console.log('User ->', user.value);

    } catch (error) {
      console.log('error ->', error)
    }
  };

  return {user, register};
});
import {defineStore} from 'pinia';
import {useCookie, useRouter} from '#app';

import type {UserRegister} from '@/types/auth/registerType';
import type {UserLogin} from '@/types/auth/loginType';
import type {User, Token, LoginResponse} from '@/types/auth/responseLogin';

export const useAuthStore = defineStore('authStore', ()=>{

  // Inicialize 'user' e 'token' com os tipos corretos
  let user = ref<User | null>(null);
  let token = ref<string | null>(null);
  
  const userCookie = useCookie<User | null>('user', { maxAge: 60 * 60 * 24 * 7 });
  const tokenCookie = useCookie<string | null>('token', { maxAge: 60 * 60 * 24 * 7 });

  const router = useRouter();

  const register = async (userRegister: UserRegister)=>{
    try {
      const response: LoginResponse = await $fetch('http://localhost:8000/api/register', {
        method:'POST',
        body:userRegister
      })
      
      user.value = response.user
      console.log('Response ->', response);

    } catch (error) {
      console.log('error ->', error)
    }
  };

  const login = async (userLogin: UserLogin)=>{
    try {
      const response: LoginResponse = await $fetch('http://localhost:8000/api/login', {
        method:'POST',
        body: userLogin
      });

      // Atribua 'user' e 'token' corretamente e salve-os nos cookies
      user.value = response.user;
      token.value = response.token.plainTextToken;

      userCookie.value = response.user;
      tokenCookie.value = response.token.plainTextToken;

      console.log('Login Response ->', response);
      /* router.push('/dashboard'); */

    } catch (error) {
      console.log(error);
    }
  };

  return {user, register, login};
});
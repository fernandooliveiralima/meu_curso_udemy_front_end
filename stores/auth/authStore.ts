import {defineStore} from 'pinia';
import {useCookie, useRouter } from '#app';

import type {FormRegister} from '@/types/auth/registerType';
import type {UserRegister, RegisterResponse} from '@/types/auth/responseRegister';

import type {FormLogin} from '@/types/auth/loginType';
import type {UserLogin, LoginResponse} from '@/types/auth/responseLogin';

import type {ResponseLogout} from '@/types/auth/responseLogout';

export const useAuthStore = defineStore('authStore', ()=>{

  let user = ref<UserLogin | UserRegister | null>(null);
  let token = ref<string | null>(null);
  const router = useRouter();

  const userCookie = ref( useCookie<UserLogin | UserRegister | null>('user', {maxAge:60*60*24*7} ) );
  const tokenCookie = ref( useCookie<string | null>('token', {maxAge:60*60*24*7} ) );

  const register = async (userRegister: FormRegister)=>{
    try {
      const response: RegisterResponse = await $fetch('http://localhost:8000/api/register', {
        method:'POST',
        body:userRegister
      } )

      userCookie.value = response.userRegistered;
      user.value = response.userRegistered;

      router.push('/auth/login');
      console.log('Register -> User Cookie', userCookie.value);
      
    } catch (error) {
      console.log(error)
    }
  }

  const login = async (userLogin: FormLogin)=>{
    try {
      const response: LoginResponse = await $fetch('http://localhost:8000/api/login', {
        method:'POST',
        body:userLogin
      });

      userCookie.value = response.user;
      tokenCookie.value = response.token.plainTextToken;
      
      user.value = response.user;
      token.value = response.token.plainTextToken;

      router.push('/dashboard');
      
    } catch (error) {
      console.log('Error Login')
    }
  };

  const logout = async ()=>{
    try {
      if(tokenCookie.value){

        const response: ResponseLogout = await $fetch('http://localhost:8000/api/logout', {
          method:'POST',
          headers:{
            'Authorization':`Bearer ${tokenCookie.value}`,
            'Accept':'application/json'
          }
        })
  
        userCookie.value = null;
        tokenCookie.value = null;
  
        user.value = null;
        token.value = null;
  
        router.push('/auth/login');

        console.log('Logout Response ->', response);

      }else{
        console.log('Unauthenticated!');
      }

    } catch (error) {
      console.log(error)
    }
  }

  return {
    user,
    userCookie,
    tokenCookie,
    token,
    register,
    login,
    logout
  };
});
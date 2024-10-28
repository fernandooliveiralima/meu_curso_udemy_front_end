import {defineStore} from 'pinia';
import {useCookie} from '#app';

import type {FormRegister} from '@/types/auth/registerType';
import type {UserRegister, RegisterResponse} from '@/types/auth/responseRegister';

import type {FormLogin} from '@/types/auth/loginType';
import type {UserLogin, LoginResponse} from '@/types/auth/responseLogin';

import type {ResponseLogout} from '@/types/auth/responseLogout';

export const useAuthStore = defineStore('authStore', ()=>{

  let user = ref<UserLogin | UserRegister | null>(null);
  let token = ref<string | null>(null);

  const userCookie = ref( useCookie<UserLogin | UserRegister | null>('user', {maxAge:60*60*24*7} ) );
  const tokenCookie = ref( useCookie<string | null>('token', {maxAge:60*60*24*7} ) );

  const register = async (userRegister: FormRegister)=>{
    try {
      const response: RegisterResponse = await $fetch('http://localhost:8000/api/register', {
        method:'POST',
        body:userRegister
      } )

      user.value = response.userRegistered;
      userCookie.value = response.userRegistered;

      console.log('User Register', user.value);
      console.log('User Cookie', userCookie.value);

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

      user.value = response.user;
      token.value = response.token.plainTextToken;

      userCookie.value = response.user;
      tokenCookie.value = response.token.plainTextToken;

      console.log('User Login', user.value);
      console.log('Token Login', token.value);
      console.log('User Cookie Login', userCookie.value);
      console.log('Token Cookie Login', tokenCookie.value);

    } catch (error) {
      
    }
  };

  const logout = async ()=>{
    try {
      const response = await $fetch('http://localhost:8000/api/logout', {
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Authorization':`Bearer ${token.value}`
        }
      })

      console.log(response)
    } catch (error) {
      
    }
  }

  return {
    user,
    userCookie,
    register,
    login,
    logout
  };
});
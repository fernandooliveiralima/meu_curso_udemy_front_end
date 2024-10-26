import {defineStore} from 'pinia';
import {useCookie, useRouter} from '#app';

import type {FormRegister} from '@/types/auth/registerType';
import type {FormLogin} from '@/types/auth/loginType';
import type {Logout} from '@/types/auth/logoutType';

import type {
  UserLogin, 
  UserRegister, 
  RegisterResponse, 
  LoginResponse} from '@/types/auth/responseLogin';

export const useAuthStore = defineStore('authStore', ()=>{

  // Inicialize 'user' e 'token' com os tipos corretos
  let user = ref<UserLogin | UserRegister | null>(null);
  let token = ref<string | null>(null);
  
  /* (60) = representa 60 segundos, ou seja, 1 minuto. */
  /* (60 * 60) = representa 60 minutos, ou seja, 1 hora. */
  /* (60 * 60 * 24) =  representa 24 horas, ou seja, 1 dia. */
  /* (60 * 60 * 24 * 7) =  representa 7 dias. */
  const userCookie = ref( useCookie<UserLogin | UserRegister | null>('user', { maxAge: 60 * 60 * 24 * 7 }) );
  const tokenCookie = ref( useCookie<string | null>('token', { maxAge: 60 * 60 * 24 * 7 }) );

  const router = useRouter();

  const register = async (userRegister: FormRegister)=>{
    try {
      const response: RegisterResponse = await $fetch('http://localhost:8000/api/register', {
        method:'POST',
        body:userRegister
      })
      
      user.value = response.userRegistered;
      userCookie.value = response.userRegistered;
      console.log('User Register  ->', user.value);
      console.log('User Cookie  ->', userCookie.value);

    } catch (error) {
      console.log('error ->', error)
    }
  };

  const login = async (userLogin: FormLogin)=>{
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

      console.log('User Login', user.value);
      console.log('Token Login', token.value);
      console.log('User Cookie Login', userCookie.value);
      console.log('Token Cookie Login', tokenCookie.value);
      /* router.push('/dashboard'); */

    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {

      const response: Logout = await $fetch(`http://localhost:8000/api/logout`, {
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${token.value}`
            }
            
        })

        user.value = null;
        userCookie.value = null;
        
        token.value = null;
        tokenCookie.value = null;

        console.log(response);

    } catch (error: unknown) {
        console.log('Erro ao fazer login:', error);
    }
};

  return {
    user, 
    register, 
    login, 
    logout
  };
});
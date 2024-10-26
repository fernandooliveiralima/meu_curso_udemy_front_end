export type UserLogin = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

export type UserRegister = {
  name: string;
  email: string;
  updated_at: string;
  created_at: string;
  id: number;
};

export type Token = {
  accessToken: string;
  abilities: string[];
  created_at: string;
  expires_at: string | null;
  id: number;
  name: string;
  tokenable_id: number;
  tokenable_type: string;
  updated_at: string;
  plainTextToken: string;
}

export type RegisterResponse = {
  userRegistered: UserRegister;
  token: Token;
}

export type LoginResponse = {
  user: UserLogin;
  token: Token;
}
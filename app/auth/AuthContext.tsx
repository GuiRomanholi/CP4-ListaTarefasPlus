import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = { id: string; name: string; email: string };
type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem('@auth:user');
      setUser(json ? JSON.parse(json) : null);
      setLoading(false);
    })();
  }, []);

  const signIn = async (email: string, password: string) => {
    const json = await AsyncStorage.getItem('@auth:users');
    const users = json ? JSON.parse(json) : [];
    const found = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) throw new Error('Credenciais inválidas');
    const u: User = { id: found.id, name: found.name, email: found.email };
    await AsyncStorage.setItem('@auth:user', JSON.stringify(u));
    setUser(u);
  };

  const signUp = async (name: string, email: string, password: string) => {
    const json = await AsyncStorage.getItem('@auth:users');
    const users = json ? JSON.parse(json) : [];
    if (users.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) throw new Error('E-mail já cadastrado');
    const full = { id: Date.now().toString(), name, email, password };
    users.push(full);
    await AsyncStorage.setItem('@auth:users', JSON.stringify(users));
    const u: User = { id: full.id, name, email };
    await AsyncStorage.setItem('@auth:user', JSON.stringify(u));
    setUser(u);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('@auth:user');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

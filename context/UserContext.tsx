import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

interface AuthContextType {
  isAuthenticated: string | null;
  setIsAuthenticated: (state: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null)


interface AuthProviderProps {
  children: ReactNode;
}



export const UserContext= ({children}: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<string | null>(null);
  const router = useRouter();
  
  const checkUserAuth = async () => {
    try {
      const getStoreValue = await SecureStore.getItem('key')
      console.log(getStoreValue)
      if (getStoreValue) {
        router.push('/(tabs)')
        return
      } else {
        router.push('/(auth)')
      }



    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    checkUserAuth()
  }, [])


  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}



export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

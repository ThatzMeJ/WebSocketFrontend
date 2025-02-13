import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface EmailVerifyContextProp {
  code: string,
  setCode: Dispatch<SetStateAction<string>>
}

export const EmailVeirfyContext = createContext<EmailVerifyContextProp | undefined>(undefined)

export const EmailVeirfyProvider = ({children}: {children: React.ReactNode}) => {
  const [code, setCode] = React.useState('')
  
  return (
   <EmailVeirfyContext.Provider value={{code, setCode}}>
    {children}
   </EmailVeirfyContext.Provider>
  )
}

// Custom hook to use the AuthContext
export const useEmailVerify = () => {
  const context = useContext(EmailVeirfyContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
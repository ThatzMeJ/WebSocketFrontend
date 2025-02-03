import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'
import { useAuth } from '@/context/UserContext'

const Index = () => {
  const {isAuthenticated} = useAuth()

  return (
    <Redirect href={isAuthenticated ? '/(tabs)' : '/(auth)'}/>
  )
}

export default Index


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { EmailVeirfyProvider } from '@/context/EmailVeirfyContext'
const _layout = () => {
  return (
    <EmailVeirfyProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='confirmCode' options={{ headerShown: false }} />
      </Stack>
    </EmailVeirfyProvider>
  )
}

export default _layout

const styles = StyleSheet.create({})
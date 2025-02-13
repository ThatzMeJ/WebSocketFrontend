import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth, useSession } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

const index = () => {
  const {signOut, isSignedIn} = useAuth()
  const router = useRouter()
 
  const logoutUser = async () => {
    try {
      await signOut()
      
      router.replace('/(auth)')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <View className='flex-1 justify-center items-center'>
      <Text>Profile</Text>
      <Button
      onPress={logoutUser}
      title='LogOut'
      />
    </View>
  )
}

export default index

const styles = StyleSheet.create({})
import { Button, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useSignUp } from '@clerk/clerk-expo'
import { useEmailVerify } from '@/context/EmailVeirfyContext'

export function ConfirmCode() {
  const router = useRouter()
  const { code, setCode } = useEmailVerify()
  const { signUp, isLoaded, setActive } = useSignUp()
  const { email } = useLocalSearchParams()

  

  const handleVerification = async (verificationCode: string) => {
    if (!isLoaded || !signUp || !setActive) {
      console.error('Required dependencies not available')
      return
    }

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verificationCode
      })

      if (signUpAttempt?.status === 'complete') {
        await setActive({
          session: signUpAttempt.createdSessionId
        })
        router.replace('/(tabs)')
      } else if (signUpAttempt?.status === 'abandoned') {
        console.warn("Sign-up process was abandoned. Restarting sign-up...")
        router.replace('/(auth)/(signup)')
      }
    } catch (error) {
      console.error('Verification error:', error)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <SafeAreaView className='w-full flex justify-center items-center'>
        {/* Header */}
        <View className="flex-row items-center w-full border-b border-gray-300 pb-4 mb-4">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
          <Text className="text-2xl font-extrabold ml-4">Enter the confirmation code</Text>
        </View>

        <Text className='w-96 mb-4'>
          To confirm your account, enter the 6-digit code we send to {email}.
        </Text>
        <View className="w-96 mb-4">
          {/* Always Visible Label Above Input */}
          <Text className="text-base font-semibold text-gray-700 mb-1">
            Confirmation Code
          </Text>

          <TextInput
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            maxLength={6}
            className="w-full border border-gray-400 rounded-md p-2 text-lg"
          />
        </View>

        <View className='w-96 items-center flex flex-col gap-4'>
          <Pressable
            onPress={() => handleVerification(code)}
            className='bg-blue-500/80 w-full p-3 rounded-3xl'
          >
            <Text className='text-center color-white'>Verify Now</Text>
          </Pressable>
          <Pressable
            onPress={() => console.log("User needs a new code")}
            className='border-black/20 border-solid border-2 w-full p-3 rounded-3xl'
          >
            <Text className='text-center'>I didn't get the code</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default ConfirmCode

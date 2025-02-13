import React, { useState, useEffect } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import InputField from '@/components/InputField';
import { useRouter } from 'expo-router';
import { encode } from "react-native-base64";
import * as SecureStore from 'expo-secure-store';
import { useSignIn } from '@clerk/clerk-expo'

interface FormState {
  email: string;
  password: string;
}

interface ErrorState {
  emailError?: string;
  passwordError?: string;
}


interface data {
  id?: number,
  user_username?: string,
  user_email?: string,
  user_password?: string
}

const Index = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Log errors whenever they are updated
  useEffect(() => {

  }, [errors]);

  const handleInputChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));


    if (field === 'email' && errors.emailError) {
      setErrors((prev) => ({
        ...prev,
        emailError: '',
      }))
    } else if (field === 'password' && errors.passwordError) {
      setErrors((prev) => ({
        ...prev,
        passwordError: '',
      }))
    }


  };

  const validateForm = (): boolean => {
    const newErrors: ErrorState = {};

    if (!form.email || (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/).test(form.email) === false) newErrors.emailError = 'Please enter an email';
    if (!form.password) newErrors.passwordError = 'Please enter a password';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!isLoaded) {
      console.error('Clerk is not loaded');
      return;
    }

    setIsLoading(true);
    try {

      // First attempt sign in
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      const str: string[] = ["needs_factor_two","needs_verification"]

      switch (signInAttempt.status) {
        case "complete":
            await setActive({ session: signInAttempt.createdSessionId });
            router.push('/(tabs)');
            break;
        case str[0]:
            // Handle 2FA
            console.log('Need to handle 2FA')
            break;
        case str[1]:
            // Handle email verification
            console.log("EMail verification")
            break;
    }
      
    
    } catch (err: any) {
      // Handle specific error cases
      console.error('Login error:', err.errors ? err.errors[0].message : err);
      setErrors(prev => ({
        ...prev,
        passwordError: err.errors ? err.errors[0].message : 'Invalid credentials'
      }));
    } finally {
      setIsLoading(false);
    }
  };



  const handleSubmit = async () => {
    if (validateForm()) {
      await handleLogin()
    } else {
      console.log('Validation failed');
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <SafeAreaView className="flex justify-center items-center px-4 gap-4 mt-10">
        {/* Header */}
        <View className="flex-row items-center w-full border-b border-gray-300 pb-4 mb-4">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
          <Text className="text-2xl font-extrabold ml-4">Log In</Text>
        </View>


        {/* Email Input */}
        <InputField
          icon={<Entypo name="mail" size={34} color="black" />}
          placeholder="Email"
          value={form.email}
          onChangeText={(value) => handleInputChange('email', value)}
          clearable
          onClear={() => handleInputChange('email', '')}
        />
        {errors.emailError && <Text className="text-red-500">{errors.emailError}</Text>}

        {/* Password Input */}
        <InputField
          icon={<Entypo name="lock" size={24} color="black" />}
          placeholder="Password"
          value={form.password}
          onChangeText={(value) => handleInputChange('password', value)}
          secureTextEntry={showPassword}
          toggleSecureTextEntry={() => setShowPassword((prev) => !prev)}
        />
        {errors.passwordError && (
          <Text className="text-red-500">{errors.passwordError}</Text>
        )}

        {/* Submit Button */}
        <Pressable
          className={`bg-orange-500 rounded-lg py-3 px-6 mt-4 w-72 ${isLoading ? 'opacity-50' : ''}`}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-bold">
            {isLoading ? 'Logging in...' : 'Log in'}
          </Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Index;

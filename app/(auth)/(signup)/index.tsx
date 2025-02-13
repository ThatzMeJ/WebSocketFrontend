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
import InputField from '@/components/InputField';
import Entypo from '@expo/vector-icons/Entypo';
import PasswordStrengthMeterBar from 'react-native-password-strength-meter-bar';
import { Redirect, useRouter } from 'expo-router';
import { useSignUp } from '@clerk/clerk-expo';



interface FormState {
  username: string;
  email: string;
  password: string;
}

interface ErrorState {
  userNameError?: string;
  emailError?: string;
  passwordError?: string;
}



const Index = () => {
  const router = useRouter();
  const { signUp, isLoaded } = useSignUp()
  const [pendingVerification, setPendingVerification] = useState<boolean>(false)
  const [form, setForm] = useState<FormState>({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const [showPassword, setShowPassword] = useState(true);

  // Log errors whenever they are updated
  useEffect(() => {

  }, [errors]);

  useEffect(() => {
    if (pendingVerification) {
      router.push({
        pathname: "/(auth)/(signup)/confirmCode",
        params: { email: `${form.email}` }
      });
      setPendingVerification(false)
    }
    

  }, [pendingVerification]); // 

  const handleInputChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (field === 'username' && errors.userNameError) {
      setErrors((prev) => ({
        ...prev,
        userNameError: '',
      }))
    } else if (field === 'email' && errors.emailError) {
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

    if (!form.username) newErrors.userNameError = 'Please enter a name';
    if (!form.email || (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/).test(form.email) === false) newErrors.emailError = 'Please enter an email';
    if (!form.password) newErrors.passwordError = 'Please enter a password';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const createNewUser = async () => {
    if (!isLoaded) {
      console.error('Clerk is not loaded yet');
      return;
    }

    try {
      await signUp?.create({
        username: form.username,
        emailAddress: form.email,
        password: form.password
      })

      await signUp?.prepareEmailAddressVerification({
        strategy: 'email_code'
      })

      setPendingVerification(true)
      // const newUser = JSON.stringify(form)
      // console.log(newUser)

      // const response = await fetch('http://192.168.1.81:3005/v1/auth/register', {
      //   method: 'POST',
      //   body: newUser,
      //   headers: {
      //     'Content-Type': "application/json"
      //   }
      // })

      // if (!response.ok) {
      //   throw new Error('Unable to fetch data')
      // }
      // const data = await response.json()
      // router.push('/(tabs)')
    } catch (err) {
      if (!err || typeof err !== 'object') {
        console.error('Unknown error occurred:', err);
        return;
      }

      const error = err as { errors?: Array<{ longMessage: string }> };
      const errMessage = error.errors?.[0]?.longMessage;

      if (!errMessage) {
        console.error('Invalid error format:', err);
        return;
      }

      const x = errMessage.split(' ')[0];
      switch(x) {
        case 'Username':
          setErrors(prev => ({
            ...prev,
            userNameError : errMessage
          }))
          break;
        case 'Passwords':
          setErrors(prev => ({
            ...prev,
            passwordError: errMessage
          }));
          break;
      }
    }
  }

 

  const handleSubmit = async () => {
    if (validateForm()) {
      await createNewUser()
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
          <Text className="text-2xl font-extrabold ml-4">Create Account</Text>
        </View>

        {/* Name Input */}
        <InputField
          icon={<Ionicons name="person-circle-sharp" size={34} color="black" />}
          placeholder="Username"
          value={form.username}
          onChangeText={(value) => handleInputChange('username', value)}
          clearable
          onClear={() => handleInputChange('username', '')}
        />
        {errors.userNameError && <Text className="text-red-500">{errors.userNameError}</Text>}

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

        {/* Password Strength Meter */}
        <View className="w-full px-1 -mt-6">
          <PasswordStrengthMeterBar
            password={form.password}
            height={10}
            radius={10}
          />
        </View>

        {/* Submit Button */}
        <Pressable
          className="bg-orange-500 rounded-lg py-3 px-6 mt-4 w-72"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-bold">Join Now</Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Index;

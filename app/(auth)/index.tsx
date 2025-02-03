import { Text, View, Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
const Index = () => {
  const router = useRouter()

  const handleSignUpNav = () => {
    router.push('/(auth)/(signin)')
  }

  const handleLogInNav = () => {
    router.push('/(auth)/(login)')
  }

  return (
    <SafeAreaView className="flex-1 justify-between items-center">
      <Image
        source={require('../../assets/images/logo.png')}
        blurRadius={2}
        style={{ width: 200, height: 200 }}
      />
      <LottieView
        autoPlay
        style={styles.LottieImage}
        progress={2}
        speed={0.5}
        source={require('../../assets/images/Animation - 1737332555415.json')}
      />
      <View className="flex flex-col justify-center items-center gap-2 w-full px-10 mb-10">
        <Text className="font-extrabold text-3xl">Welcome to WebSocket101</Text>
        <Text className="text-xl mb-5">The home of the great culture</Text>
          <Pressable
            style={styles.signUpButton}
            onPress={() => handleSignUpNav()}
          >
            <Text className="text-white text-center">Sign Up</Text>
          </Pressable>
        <Pressable
          style={[
            styles.loginButton,
          ]}
          onPress={() => handleLogInNav()}
        >
          <Text className="text-black text-center">Log in</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  signUpButton: {
    backgroundColor: '#FF4500',
    width: 300,
    borderRadius: 10,
    height: 35,
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonPressed: {
    opacity: 0.5, // Reduce opacity on press
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    width: 300,
    borderRadius: 10,
    height: 35,
    justifyContent: 'center',
    borderColor: '#000000',
    borderWidth: 1,
  },
  LottieImage: {
    width: 300,
    height: 300
  }
});

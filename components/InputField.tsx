import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

const InputField =({
  icon,
  placeholder,
  value,
  onChangeText,
  clearable = false,
  onClear,
  secureTextEntry = false,
  toggleSecureTextEntry,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  clearable?: boolean;
  onClear?: () => void;
  secureTextEntry?: boolean;
  toggleSecureTextEntry?: () => void;
}) => {
  return (
    <View className="flex-row items-center border-2 border-black rounded-lg h-12 px-4 mb-2 w-full">
      {icon}
      <TextInput
        className="flex-1 ml-2"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {clearable && value && (
        <Pressable onPress={onClear}>
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
      )}
      {toggleSecureTextEntry && (
        <Pressable onPress={toggleSecureTextEntry}>
          {secureTextEntry ? (
            <Feather name="eye-off" size={24} color="black" />
          ) : (
            <Feather name="eye" size={24} color="black" />
          )}
        </Pressable>
      )}
    </View>
  );
}

export default InputField


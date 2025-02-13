import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface Props {
  isOpen: boolean,
  withInput?: boolean
}

const LogoutModal = ({isOpen, withInput}: Props) => {
  const content = withInput ? (
    <KeyboardAvoidingView
    className='flex-1 justify-center items-center'
    >

    </KeyboardAvoidingView>
  ) : (
    <View>
      <Text>Hello</Text>
    </View>
  )

  return (
    <View>
      <Text>LogoutModal</Text>
    </View>
  )
}

export default LogoutModal


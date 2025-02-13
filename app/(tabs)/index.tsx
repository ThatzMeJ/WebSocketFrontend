import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'

const index = () => {
  return <Redirect href={'/(tabs)/home'} />
}

export default index


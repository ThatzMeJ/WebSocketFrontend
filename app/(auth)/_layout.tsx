import { Stack, Redirect } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <>
      {/* Normal navigation stack */}
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(signup)" options={{ headerShown: false }} />
        <Stack.Screen name="(login)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

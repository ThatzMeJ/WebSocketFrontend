import React, { useEffect } from 'react'
import { Redirect, useRouter, useSegments } from 'expo-router'
import { useAuth, useSession } from '@clerk/clerk-expo'

const Index = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const {session} = useSession()
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(tabs)';
    const inAuthGroup = segments[0] === '(auth)';

    if (isSignedIn && inAuthGroup) {
      // Redirect to tabs if user is signed in but in auth group
       return router.replace('/(tabs)')
    } 
    
    if (!isSignedIn && inTabsGroup) {
      // Redirect to auth if user is not signed in but trying to access tabs
       return router.replace('/(auth)')
    }
  }, [isSignedIn, segments, isLoaded]);

  if (isSignedIn && session?.status === 'active') return <Redirect href={'/(tabs)'}/>

  return (
    <Redirect href={'/(auth)'}/>
  )
}

export default Index


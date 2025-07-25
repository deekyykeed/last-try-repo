import { useAuth } from '@clerk/clerk-expo';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

export default function ProtectedLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      // If user isn't signed in, redirect them to the sign in page.
      router.replace('/(auth)/signIn');
    }
  }, [isSignedIn, isLoaded]);

  return (
    <Stack>
      <Stack.Screen 
        name="post/[id]" 
        options={{
          title: 'Post Details',
          headerBackTitle: 'Back',
        }} 
      />
    </Stack>
  );
}

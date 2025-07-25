import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { tokenCache } from '@/auth/clerk';
import { useColorScheme } from '@/hooks/useColorScheme';

// Get your Clerk publishable key from your Clerk Dashboard
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(tabs)';
    const inAuthGroup = segments[0] === '(auth)';

    if (isSignedIn && inAuthGroup) {
      // Redirect to home page if user is signed in and in auth group
      router.replace('/(tabs)');
    } else if (!isSignedIn && !inAuthGroup) {
      // Redirect to sign in page if user is not signed in and trying to access protected routes
      router.replace('/(auth)/signIn');
    }
  }, [isSignedIn, segments, isLoaded]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Slot />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'), // Commented out - font file missing
  });

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider 
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
}

import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import {
    Button,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SignUpPage() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignUpPress = React.useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.create({
        emailAddress,
        password,
      });

      // Check the status of the sign-up attempt
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.log(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email"
        placeholderTextColor="#aaa"
        onChangeText={setEmailAddress}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={onSignUpPress} />
      <View style={styles.signInContainer}>
        <Text style={styles.text}>Already have an account?</Text>
        <Link href="/(auth)/signIn" asChild>
          <TouchableOpacity>
            <Text style={styles.signInText}> Sign in</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  signInContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    color: 'grey',
  },
  signInText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
  },
});

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/landing'); // Go to landing page after login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Log In</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} style={styles.input} />
      <Button title="Log In" onPress={handleLogin} />
      <TouchableOpacity onPress={() => router.push('/auth/signup')}>
        <Text style={styles.signupLink}>Don&apos;t have an account? Sign Up</Text>
      </TouchableOpacity>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 100 },
  input: { borderBottomWidth: 1, marginBottom: 12 },
  error: { color: 'red', marginTop: 10 },
  signupLink: { color: '#0077b6', marginTop: 16, textAlign: 'center', textDecorationLine: 'underline' },
});

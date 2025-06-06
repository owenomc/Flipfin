import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotFound() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🦈</Text>
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.subtitle}>Sorry, we couldn&apos;t find that page.</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('./landing')}>
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0faff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0077b6',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#495057',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0077b6',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
import React from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import NavBar from './components/NavBar';
import globalStyles from '../styles/global';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router'; // <-- Add this

const LandingPage = () => {
  const router = useRouter(); // <-- Add this

  return (
    <SafeAreaView style={globalStyles.container}>
      <NavBar />
      <ScrollView contentContainerStyle={globalStyles.scrollContent}>
        <Image
          source={require('../assets/images/flippy.jpg')}
          style={globalStyles.heroImage}
          resizeMode="contain"
        />
        <Text style={globalStyles.subtitle}>WEB</Text>
        <Text style={globalStyles.logo}>🦈 Flipfin AI</Text>
        <Text style={globalStyles.tagline}>The End of Your Money Problems</Text>
        <Text style={globalStyles.subtitle}>Bite-sized lessons. Big financial wins.</Text>
        <View style={globalStyles.featuresContainer}>
          <Text style={globalStyles.feature}>🎯 Personalized Learning</Text>
          <Text style={globalStyles.feature}>🧠 Gamified Education</Text>
          <Text style={globalStyles.feature}>💸 Real-Life Financial Skills</Text>
          <Text style={globalStyles.feature}>🤖 Smart AI Coach</Text>
        </View>
        {/* Add Sign In and Sign Up buttons */}
        <TouchableOpacity style={globalStyles.button} onPress={() => router.push('/auth/login')}>
          <Text style={globalStyles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.secondaryButton} onPress={() => router.push('./app/auth/signup')}>
          <Text style={globalStyles.secondaryButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>Get Early Access</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.secondaryButton}>
          <Text style={globalStyles.secondaryButtonText}>Watch Demo</Text>
        </TouchableOpacity>
        <Text style={globalStyles.footer}>© 2025 Flipfin Labs • No sharky fees 🦈</Text>
        <Button title="Sign Out" onPress={() => signOut(auth)} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingPage;
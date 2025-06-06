import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  useColorScheme, // <-- Add this
} from "react-native";
import NavBar from "./components/NavBar";
import globalStyles from "../styles/global";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "expo-router";

const LandingPage = () => {
  const router = useRouter();
  const colorSchemeRaw = useColorScheme(); // <-- Detect color scheme
  const colorScheme: "light" | "dark" | undefined =
    colorSchemeRaw === null ? undefined : colorSchemeRaw;

  const styles = globalStyles(colorScheme); // <-- Use theme-aware styles

  const handleSignOut = async () => {
    await signOut(auth);
    router.replace("/auth/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={require("../assets/images/flippy.jpg")}
          style={styles.heroImage}
          resizeMode="contain"
        />
        <Text style={styles.logo}>🦈 Flipfin AI</Text>
        <Text style={styles.tagline}>The End of Your Money Problems</Text>
        <Text style={styles.subtitle}>
          Bite-sized lessons. Big financial wins.
        </Text>
        <View style={styles.featuresContainer}>
          <Text style={styles.feature}>🎯 Personalized Learning</Text>
          <Text style={styles.feature}>🧠 Gamified Education</Text>
          <Text style={styles.feature}>💸 Real-Life Financial Skills</Text>
          <Text style={styles.feature}>🤖 AI Finance Coach</Text>
        </View>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Watch Demo</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>© 2025 Flipfin</Text>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
      <NavBar colorScheme={"dark"} />
    </SafeAreaView>
  );
};

export default LandingPage;

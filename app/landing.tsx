import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import globalStyles from "../styles/global";
import NavBar from "./components/NavBar";

const LandingPage = () => {
  const styles = globalStyles();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          localStyles.scrollContent,
        ]}
      >
        <View style={localStyles.card}>
          <Image
            source={require("../assets/images/flippy.jpg")}
            style={localStyles.heroImage}
            resizeMode="contain"
          />
          <Text style={localStyles.logo}>Flipfin - Financial AI</Text>
          <Text style={localStyles.tagline}>
            Bite-sized lessons. Big financial wins.
          </Text>
          <View style={localStyles.featuresCard}>
            <Text style={localStyles.feature}>🎯 Personalized Learning</Text>
            <Text style={localStyles.feature}>🧠 Gamified Education</Text>
            <Text style={localStyles.feature}>
              💸 Real-Life Financial Skills
            </Text>
            <Text style={localStyles.feature}>🤖 AI Finance Coach</Text>
          </View>
        </View>
      </ScrollView>
      <NavBar colorScheme="dark" />
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 24,
  },
  card: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    alignItems: "center",
  },
  heroImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 18,
    borderWidth: 3,
    borderColor: "#0077b6",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 6,
    textAlign: "center",
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 18,
    color: "#0077b6",
    fontWeight: "600",
    marginBottom: 18,
    textAlign: "center",
  },
  featuresCard: {
    backgroundColor: "#f1f3f6",
    borderRadius: 12,
    padding: 18,
    marginBottom: 0,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    alignItems: "flex-start",
  },
  feature: {
    fontSize: 16,
    color: "#22223b",
    marginBottom: 8,
    fontWeight: "500",
  },
});

export default LandingPage;

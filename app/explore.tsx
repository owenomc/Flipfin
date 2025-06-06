import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Platform, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NavBar from "./components/NavBar"; // <-- Add this import

// Example lesson data for a personal finance "tree"
const lessons = [
  {
    id: 1,
    title: "What is Money?",
    description: "Understand the basics of money and value.",
    icon: require("../assets/images/flippy.jpg"),
    unlocked: true,
  },
  {
    id: 2,
    title: "Saving vs. Spending",
    description: "Learn why saving is important.",
    icon: require("../assets/images/flippy.jpg"),
    unlocked: true,
  },
  {
    id: 3,
    title: "Budgeting Basics",
    description: "How to make a simple budget.",
    icon: require("../assets/images/flippy.jpg"),
    unlocked: true,
  },
  {
    id: 4,
    title: "Bank Accounts",
    description: "Checking, savings, and how banks work.",
    icon: require("../assets/images/flippy.jpg"),
    unlocked: true,
  },
  {
    id: 5,
    title: "Credit & Debt",
    description: "Understanding credit cards and loans.",
    icon: require("../assets/images/flippy.jpg"),
    unlocked: false,
  },
  {
    id: 6,
    title: "Investing 101",
    description: "Intro to stocks, bonds, and growing your money.",
    icon: require("../assets/images/flippy.jpg"),
    unlocked: false,
  },
  {
    id: 7,
    title: "Sharky’s Emergency Fund",
    description: "Why you need a safety net.",
    icon: require("../assets/images/flippy.jpg"),
    unlocked: false,
  },
  {
    id: 8,
    title: "Smart Shopping",
    description: "Tips for spending wisely.",
    icon: require("../assets/images/flippy.jpg"),
    unlocked: false,
  },
  {
    id: 9,
    title: "Taxes for Beginners",
    description: "What are taxes and why do we pay them?",
    icon: require("../assets/images/flippy.jpg"),
    unlocked: false,
  },
  {
    id: 10,
    title: "Planning for the Future",
    description: "Setting goals and making your money work for you.",
    icon: require("../assets/images/flippy.jpg"),
    unlocked: false,
  },
];

export default function Learn() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e0f7fa" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>
          <Ionicons name="school" size={28} color="#0077b6" />{" "}
          Shark School: Personal Finance Tree
        </Text>
        <View style={styles.tree}>
          {lessons.map((lesson, idx) => (
            <View key={lesson.id} style={styles.lessonContainer}>
              {/* Draw a connecting line except for the first lesson */}
              {idx !== 0 && (
                <View style={styles.lineContainer}>
                  <View style={styles.line} />
                </View>
              )}
              <TouchableOpacity
                style={[
                  styles.lesson,
                  lesson.unlocked ? styles.unlocked : styles.locked,
                  // On web, alternate left/right; on mobile, center
                  Platform.OS === "web"
                    ? idx % 2 === 0
                      ? styles.leftLesson
                      : styles.rightLesson
                    : null,
                ]}
                disabled={!lesson.unlocked}
                activeOpacity={lesson.unlocked ? 0.7 : 1}
              >
                <Image source={lesson.icon} style={styles.icon} />
                <View>
                  <Text style={styles.title}>{lesson.title}</Text>
                  <Text style={styles.desc}>{lesson.description}</Text>
                </View>
                {!lesson.unlocked && (
                  <Ionicons name="lock-closed" size={24} color="#b0b0b0" style={{ marginLeft: 8 }} />
                )}
              </TouchableOpacity>
            </View>
          ))}
          {/* Shark at the bottom for theme */}
          <View style={styles.sharkContainer}>
            <Image
              source={require("../assets/images/flippy.jpg")}
              style={styles.shark}
              resizeMode="contain"
            />
            <Text style={styles.sharkText}>Swim up the tree to master your money!</Text>
          </View>
        </View>
      </ScrollView>
      <NavBar colorScheme="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "#e0f7fa",
    minHeight: 600,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#0077b6",
    textAlign: "center",
  },
  tree: {
    alignItems: "center",
    width: "100%",
    paddingBottom: 40,
    maxWidth: 500,
    ...(Platform.OS === "web"
      ? { marginLeft: "auto", marginRight: "auto" }
      : {}),
  },
  lessonContainer: {
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  lesson: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    width: "90%",
    maxWidth: 400,
    borderWidth: 2,
    borderColor: "#b2ebf2",
    // Remove boxShadow for web, use shadow for native only
    ...(Platform.OS !== "web"
      ? {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        }
      : {}),
  },
  leftLesson: {
    alignSelf: "flex-start",
    marginLeft: 24,
  },
  rightLesson: {
    alignSelf: "flex-end",
    marginRight: 24,
  },
  unlocked: {
    opacity: 1,
  },
  locked: {
    opacity: 0.5,
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 16,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#0077b6",
    backgroundColor: "#e0f7fa",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0077b6",
  },
  desc: {
    fontSize: 14,
    color: "#555",
    maxWidth: 200,
  },
  lineContainer: {
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: 4,
    height: 32,
    backgroundColor: "#0077b6",
    borderRadius: 2,
  },
  sharkContainer: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  shark: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#0077b6",
  },
  sharkText: {
    fontSize: 16,
    color: "#0077b6",
    fontWeight: "600",
    textAlign: "center",
  },
});
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

type NavBarProps = {
  colorScheme: "light" | "dark";
};

const NavBar = ({ colorScheme }: NavBarProps) => {
  const router = useRouter();
  const themeColor = colorScheme === "dark" ? "#90caf9" : "#0077b6";
  const bgColor = colorScheme === "dark" ? "#1a1a1a" : "#fff";
  const borderColor = colorScheme === "dark" ? "#222c36" : "#eee";
  const labelColor = themeColor;

  return (
    <View style={[styles.navbar, { backgroundColor: bgColor, borderTopColor: borderColor }]}>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("./lessons")}>
        <Ionicons name="book" size={28} color={themeColor} />
        <Text style={[styles.label, { color: labelColor }]}>Lessons</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("./skilltree")}>
        <MaterialCommunityIcons name="tree" size={28} color={themeColor} />
        <Text style={[styles.label, { color: labelColor }]}>Skilltree</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("./profile")}>
        <FontAwesome name="user" size={28} color={themeColor} />
        <Text style={[styles.label, { color: labelColor }]}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("./settings")}>
        <Ionicons name="settings" size={28} color={themeColor} />
        <Text style={[styles.label, { color: labelColor }]}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 64,
    backgroundColor: "#fff", // overridden dynamically
    borderTopWidth: 1,
    borderTopColor: "#eee", // overridden dynamically
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#0077b6", // overridden dynamically
    marginTop: 2,
  },
});

export default NavBar;
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const NavBar = ({ colorScheme }: { colorScheme?: "light" | "dark" }) => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Home", icon: "home", route: "/landing" },
    { label: "Explore", icon: "compass", route: "/explore" },
    { label: "Learn", icon: "school", route: "/learn" },
    { label: "Coach", icon: "chatbubbles", route: "/coach" },
    { label: "Profile", icon: "person", route: "/profile" },
  ];

  return (
    <View style={styles.navBar}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;
        return (
          <TouchableOpacity
            key={tab.route}
            style={styles.navButton}
            onPress={() => router.replace(tab.route as any)}
          >
            <Ionicons
              name={tab.icon as any}
              size={isActive ? 34 : 28}
              color={isActive ? "#0077b6" : "#4a4e69"}
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e1dd",
    paddingBottom: 12,
    paddingTop: 8,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  navButton: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: "#4a4e69",
    marginTop: 2,
    fontWeight: "600",
  },
  activeLabel: {
    color: "#0077b6",
    fontWeight: "700",
  },
});

export default NavBar;
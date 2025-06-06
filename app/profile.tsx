import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { auth , db } from "../firebaseConfig";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";

type UserProfile = {
  username?: string;
  age?: number;
  createdAt?: { seconds: number; nanoseconds: number } | string;
};

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Editable fields
  const [editUsername, setEditUsername] = useState("");
  const [editAge, setEditAge] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        router.replace("/auth/login");
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setProfileLoading(true);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          setProfile(data);
          setEditUsername(data.username || "");
          setEditAge(data.age !== undefined ? String(data.age) : "");
        }
        setProfileLoading(false);
      }
    };
    if (user) fetchProfile();
  }, [user]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.replace("/auth/login");
  };

  const handleSave = async () => {
    if (!user) return;
    if (!editUsername.trim()) {
      Alert.alert("Username is required.");
      return;
    }
    const ageNum = Number(editAge);
    if (editAge && (isNaN(ageNum) || ageNum < 0)) {
      Alert.alert("Please enter a valid age.");
      return;
    }
    setSaving(true);
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        username: editUsername.trim(),
        age: editAge ? ageNum : null,
      });
      setProfile((prev) => ({
        ...prev,
        username: editUsername.trim(),
        age: editAge ? ageNum : undefined,
      }));
      Alert.alert("Profile updated!");
    } catch (e) {
      Alert.alert("Error updating profile", (e as Error).message);
    }
    setSaving(false);
  };

  if (loading || profileLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color="#0077b6" />
      </View>
    );
  }

  // Format Firestore Timestamp or string date
  let formattedDate = "";
  if (profile?.createdAt) {
    if (typeof profile.createdAt === "string") {
      formattedDate = new Date(profile.createdAt).toLocaleDateString();
    } else if (typeof profile.createdAt === "object" && "seconds" in profile.createdAt) {
      formattedDate = new Date(profile.createdAt.seconds * 1000).toLocaleDateString();
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Account Information</Text>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user?.email}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.input}
              value={editUsername}
              onChangeText={setEditUsername}
              placeholder="Enter username"
              placeholderTextColor="#888"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Age:</Text>
            <TextInput
              style={styles.input}
              value={editAge}
              onChangeText={setEditAge}
              placeholder="Enter age"
              placeholderTextColor="#888"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Date Signed Up:</Text>
            <Text style={styles.value}>{formattedDate || "—"}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>User ID:</Text>
            <Text style={styles.value}>{user?.uid}</Text>
          </View>
          <TouchableOpacity
            style={[styles.button, saving && { opacity: 0.7 }]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f6f8fa",
  },
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
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#22223b",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#4a4e69",
    marginBottom: 24,
    textAlign: "center",
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#f1f3f6",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e1dd",
  },
  label: {
    fontSize: 15,
    color: "#4a4e69",
    fontWeight: "600",
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: "#22223b",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e1dd",
    color: "#22223b",
    marginTop: 4,
  },
  button: {
    width: "100%",
    backgroundColor: "#0077b6",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 0,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 17,
    letterSpacing: 0.5,
  },
});
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NavBar = () => (
  <View style={styles.navbar}>
    <Text style={styles.brand}>Flipfin</Text>
    <View style={styles.links}>
      <TouchableOpacity>
        <Text style={styles.link}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.link}>Features</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.link}>Pricing</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.link}>Contact</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
  },
  brand: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0077b6',
  },
  links: {
    flexDirection: 'row',
  },
  link: {
    marginLeft: 24,
    fontSize: 18,
    color: '#023e8a',
    fontWeight: '500',
    cursor: 'pointer',
  },
});

export default NavBar;
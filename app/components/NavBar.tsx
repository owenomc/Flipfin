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
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
  },
  brand: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0077b6',
  },
  links: {
    flexDirection: 'row',
  },
  link: {
    marginLeft: 18,
    fontSize: 16,
    color: '#023e8a',
    fontWeight: '500',
  },
});

export default NavBar;
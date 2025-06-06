import { StyleSheet } from 'react-native';

const light = {
  container: {
    backgroundColor: '#f0faff',
  },
  heroImage: {
    backgroundColor: '#e0f7fa',
  },
  logo: {
    color: '#0077b6',
  },
  tagline: {
    color: '#023e8a',
  },
  subtitle: {
    color: '#495057',
  },
  feature: {
    color: '#023e8a',
  },
  button: {
    backgroundColor: '#0077b6',
  },
  buttonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#0077b6',
  },
  footer: {
    color: '#6c757d',
  },
};

const dark = {
  container: {
    backgroundColor: '#121212',
  },
  heroImage: {
    backgroundColor: '#222c36',
  },
  logo: {
    color: '#90caf9',
  },
  tagline: {
    color: '#b3e5fc',
  },
  subtitle: {
    color: '#b0bec5',
  },
  feature: {
    color: '#b3e5fc',
  },
  button: {
    backgroundColor: '#1565c0',
  },
  buttonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#90caf9',
  },
  footer: {
    color: '#b0bec5',
  },
};

const globalStyles = (colorScheme: 'light' | 'dark' = 'light') =>
  StyleSheet.create({
    container: {
      flex: 1,
      ...(colorScheme === 'dark' ? dark.container : light.container),
    },
    scrollContent: {
      alignItems: 'center',
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
    heroImage: {
      width: 180,
      height: 180,
      marginBottom: 18,
      borderRadius: 90,
      ...(colorScheme === 'dark' ? dark.heroImage : light.heroImage),
    },
    logo: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 4,
      ...(colorScheme === 'dark' ? dark.logo : light.logo),
    },
    tagline: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 10,
      ...(colorScheme === 'dark' ? dark.tagline : light.tagline),
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      marginVertical: 10,
      ...(colorScheme === 'dark' ? dark.subtitle : light.subtitle),
    },
    featuresContainer: {
      marginTop: 20,
      marginBottom: 30,
      alignItems: 'flex-start',
      width: '100%',
      maxWidth: 400,
    },
    feature: {
      fontSize: 16,
      paddingVertical: 5,
      ...(colorScheme === 'dark' ? dark.feature : light.feature),
    },
    button: {
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 10,
      marginTop: 10,
      width: 240,
      alignItems: 'center',
      ...(colorScheme === 'dark' ? dark.button : light.button),
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      ...(colorScheme === 'dark' ? dark.buttonText : light.buttonText),
    },
    secondaryButton: {
      marginTop: 15,
    },
    secondaryButtonText: {
      fontSize: 16,
      textDecorationLine: 'underline',
      ...(colorScheme === 'dark' ? dark.secondaryButtonText : light.secondaryButtonText),
    },
    footer: {
      marginTop: 40,
      fontSize: 12,
      textAlign: 'center',
      ...(colorScheme === 'dark' ? dark.footer : light.footer),
    },
  });

export default globalStyles;
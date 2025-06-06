import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0faff',
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
    backgroundColor: '#e0f7fa',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0077b6',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    color: '#023e8a',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#495057',
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
    color: '#023e8a',
  },
  button: {
    backgroundColor: '#0077b6',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    width: 240,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginTop: 15,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#0077b6',
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 40,
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default globalStyles;
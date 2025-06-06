import { Platform } from 'react-native';

let LandingPageUI;
if (Platform.OS === 'web') {
  LandingPageUI = require('./LandingPage.web').default;
} else {
  LandingPageUI = require('./LandingPage.mobile').default;
}

export default LandingPageUI;
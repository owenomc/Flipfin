import { Platform } from 'react-native';
import type { ComponentType } from 'react';

let LandingPageUI: ComponentType;

if (Platform.OS === 'web') {
  LandingPageUI = require('./LandingPage.web').default;
} else {
  LandingPageUI = require('./LandingPage.mobile').default;
}

export default LandingPageUI;
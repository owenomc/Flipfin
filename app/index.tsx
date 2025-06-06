import type { ComponentType } from 'react';

// Import dynamically and cast with type
const LandingPage = require('./LandingPage').default as ComponentType<any>;

export default LandingPage;
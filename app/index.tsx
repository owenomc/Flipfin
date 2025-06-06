import React from 'react';
import type { ComponentType } from 'react';

// Explicitly type the import

import type { ComponentType as LandingPageType } from 'react';
const LandingPage = require('./LandingPage').default as LandingPageType<any>;

export default LandingPage;
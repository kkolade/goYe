// Firebase Configuration
export const FIREBASE_CONFIG = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "YOUR_APP_ID",
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID"
};

// App Configuration
export const APP_CONFIG = {
  name: "GoYeCRM",
  version: "1.0.0",
  environment: process.env.NODE_ENV || "development",
  enableAnalytics: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS === "true" || false,
  apiUrl: process.env.EXPO_PUBLIC_API_URL || "https://api.yourdomain.com",
};

// Storage Configuration
export const STORAGE_KEYS = {
  AUTH_TOKEN: "@GoYeCRM:authToken",
  USER_DATA: "@GoYeCRM:userData",
  THEME_PREFERENCE: "@GoYeCRM:themePreference",
  LAST_SYNC: "@GoYeCRM:lastSync",
};

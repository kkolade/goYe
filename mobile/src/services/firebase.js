import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { enableIndexedDbPersistence } from 'firebase/firestore';

import { FIREBASE_CONFIG } from '../../config';

// Initialize Firebase app
const app = getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApp();

// Always initialize auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);
enableIndexedDbPersistence(db).catch(err => {
  if (err.code === 'failed-precondition') {
    console.warn('Offline persistence can only be enabled in one tab at a time');
  } else if (err.code === 'unimplemented') {
    console.warn('Current browser does not support all features required for offline persistence');
  }
});

export { auth, db, storage };
export default app;

import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD6UUzGGm_Gw4DNTFtpXt0s9DD2Hj0vcMQ',
  authDomain: 'cp4-listatarefas.firebaseapp.com',
  projectId: 'cp4-listatarefas',
  storageBucket: 'cp4-listatarefas.firebasestorage.app',
  messagingSenderId: '825318768068',
  appId: '1:825318768068:web:8824b1edb782006c94f891',
  measurementId: 'G-31H059DFJS'
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const { initializeAuth, getReactNativePersistence, getAuth } = require('firebase/auth');

let auth: any;
try {
  auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
} catch {
  auth = getAuth(app);
}

const db = initializeFirestore(app, { experimentalForceLongPolling: true });

export { app, auth, db };

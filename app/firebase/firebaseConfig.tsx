import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD6UUzGGm_Gw4DNTfEptXt0s9DD2Hj0vcMQ',
  authDomain: 'cp4-listatarefas.firebaseapp.com',
  projectId: 'cp4-listatarefas',
  storageBucket: 'cp4-listatarefas.firebasestorage.app',
  messagingSenderId: '825318768068',
  appId: '1:825318768068:web:8824b1edb782006c94f891',
  measurementId: 'G-31H059DFJS'
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

function ensureAuth() {
  const g = global as any;
  if (!g.__auth) {
    const rnAuth = require('firebase/auth');
    g.__auth = initializeAuth(app, {
      persistence: rnAuth.getReactNativePersistence(AsyncStorage)
    });
  }
  return g.__auth;
}

const auth = ensureAuth();

export { app, auth };

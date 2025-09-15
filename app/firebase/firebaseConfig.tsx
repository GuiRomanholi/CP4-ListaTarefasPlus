import { initializeApp } from 'firebase/app'
import { initializeAuth } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { initializeFirestore, setLogLevel, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const { getReactNativePersistence } = require('firebase/auth') as any

const firebaseConfig = {
  apiKey: 'AIzaSyD6UUzGGm_Gw4DNTFtpXt0s9DD2Hj0vcMQ',
  authDomain: 'cp4-listatarefas.firebaseapp.com',
  projectId: 'cp4-listatarefas',
  storageBucket: 'cp4-listatarefas.firebasestorage.app',
  messagingSenderId: '825318768068',
  appId: '1:825318768068:web:8824b1edb782006c94f891',
  measurementId: 'G-31H059DFJS'
};

const app = initializeApp(firebaseConfig)
const db = initializeFirestore(app, { experimentalForceLongPolling: true })
setLogLevel('error')

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

const storage = getStorage(app)

export { auth, db, storage, collection, addDoc, getDocs, doc, updateDoc, deleteDoc }
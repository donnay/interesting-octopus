import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCFtk69FaCrpnLLinOgYzTWXBk0Hwxott8",
  authDomain: "genesisrpg-site.firebaseapp.com",
  projectId: "genesisrpg-site",
  storageBucket: "genesisrpg-site.firebasestorage.app",
  messagingSenderId: "1053533444020",
  appId: "1:1053533444020:web:08980b8f389078816dc4e1",
  measurementId: "G-BLYB9DPFGE",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


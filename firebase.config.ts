import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD_Xr_fplOhS2UmHcBA7OriwA0QlBfGKrs',
  authDomain: 'selfie-vid-uploader.firebaseapp.com',
  projectId: 'selfie-vid-uploader',
  storageBucket: 'selfie-vid-uploader.appspot.com',
  messagingSenderId: '249579904188',
  appId: '1:249579904188:web:796206ecbd149fcf3a04b9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };

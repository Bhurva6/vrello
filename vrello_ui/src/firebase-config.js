import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCkqojxVOsiiwCT108iI6McH7jbaH_0r2k",
  authDomain: "vrello-ec907.firebaseapp.com",
  projectId: "vrello-ec907",
  storageBucket: "vrello-ec907.appspot.com",
  messagingSenderId: "232417980911",
  appId: "1:232417980911:web:eb9ba1f8627541fe83c61a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);


export { auth, app, storage};
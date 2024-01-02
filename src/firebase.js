import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvtTdOjKjTSwsHin6xe13mmAhZKTarP8c",
  authDomain: "messengerapp-820b6.firebaseapp.com",
  projectId: "messengerapp-820b6",
  storageBucket: "messengerapp-820b6.appspot.com",
  messagingSenderId: "278660051062",
  appId: "1:278660051062:web:5697fee25a83fea69baf57",
  measurementId: "G-LZGEGXR261"
};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  
  export { auth, provider };
  export default db;

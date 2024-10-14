import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAyfD9UJnukaEL0X3IvjFhWMnGlQT8VCVk",
    authDomain: "knightcoin1766.firebaseapp.com",
    projectId: "knightcoin1766",
    storageBucket: "knightcoin1766.appspot.com",
    messagingSenderId: "248278181836",
    appId: "1:248278181836:web:d90debc81b0ce8d38c5f69",
    measurementId: "G-YNFFFLQH30"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    await setDoc(userRef, {
      name: user.displayName,
      email: user.email,
      amount: 0,
      gpa: 0.0,
      credits: 0
    });
  }

  return user;
};

const signOutUser = () => signOut(auth);

export { auth, db, signInWithGoogle, signOutUser };

import getNamesFromDisplayName from '@/utils/getNamesFromDisplayName';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { createUser } from '../api/user';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const firebase = initializeApp(firebaseConfig);

if (typeof window !== 'undefined') {
  getAnalytics();
}

export const auth = getAuth(firebase);

const googleProvider = new GoogleAuthProvider();

export const authWithGoogle = async () => {
  signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      const additionalUserInfo = getAdditionalUserInfo(result);
      if (additionalUserInfo && additionalUserInfo.isNewUser) {
        let visitedDestionations = null;

        const visitedDestionationsFromCache = localStorage.getItem(
          'visitedDestinations',
        );

        if (visitedDestionationsFromCache) {
          visitedDestionations = JSON.parse(visitedDestionationsFromCache);
        }

        await createUser(
          auth.currentUser?.email || '',
          getNamesFromDisplayName(auth.currentUser?.displayName).firstName,
          getNamesFromDisplayName(auth.currentUser?.displayName).lastName,
          visitedDestionations,
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  rememberMe: boolean,
) => {
  setPersistence(
    auth,
    rememberMe ? browserLocalPersistence : browserSessionPersistence,
  )
    .then(async () => {
      await signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      return error.code;
    });
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    return err.code;
  }
};

export const registerWithEmailAndPassword = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string,
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    let visitedDestionations = null;

    const visitedDestionationsFromCache = localStorage.getItem(
      'visitedDestinations',
    );

    if (visitedDestionationsFromCache) {
      visitedDestionations = JSON.parse(visitedDestionationsFromCache);
    }

    await createUser(email, firstName, lastName, visitedDestionations);
  } catch (err: any) {
    return err.code;
  }
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err: any) {
    return err.code;
  }
};

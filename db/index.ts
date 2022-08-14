import { initializeApp, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, getDocs, collection, query, where, limit } from 'firebase/firestore';
import { DocumentSnapshot } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';

interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig: IFirebaseConfig = {
  apiKey: 'AIzaSyAuHrrmQ9z8HZGgQHhHYRPmvhnrYJn1vzc',
  authDomain: 'fir-fundamentals-hello.firebaseapp.com',
  projectId: 'fir-fundamentals-hello',
  storageBucket: 'fir-fundamentals-hello.appspot.com',
  messagingSenderId: '841032629443',
  appId: '1:841032629443:web:f41421ff042e2c3d48b676',
  measurementId: 'G-FEDR8GS6N4',
};

const createFirebaseApp = (config: IFirebaseConfig) => {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
};

const firebaseApp = createFirebaseApp(firebaseConfig);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export const db = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);
export type STATE_CHANGED = 'state_change';

export async function getUserWithUsername(username: string) {
  const q = query(collection(db, 'users'), where('username', '==', username), limit(1));
  return (await getDocs(q)).docs[0];
}

export function postToJSON(doc: DocumentSnapshot) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

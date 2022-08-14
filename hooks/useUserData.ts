import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@db';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IUser } from '@interfaces/user.interface';

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState<null | string>(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = doc(db, 'users', user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}

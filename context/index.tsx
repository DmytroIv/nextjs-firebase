import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { IUser } from '@interfaces/user.interface';
import { onAuthStateChanged } from '@firebase/auth';
import { auth, db } from '@db';
import { doc, getDoc, writeBatch } from 'firebase/firestore';

interface IUserContext {
  user?: IUser | null;
  username?: string | null;
  setUser: (user: IUser | null) => void;
  setUsername: (username: string | null) => void;
}

const initState: IUserContext = {
  user: null,
  username: null,
  setUser: () => {},
  setUsername: () => {},
};

export const UserContext = createContext<IUserContext>(initState);

export const UserProvider = ({ children, ...props }: PropsWithChildren): JSX.Element => {
  const [username, setUsername] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);

        const userRef = doc(db, 'users', authUser.uid);
        const userDoc = await getDoc(userRef);
        const { username }: any = userDoc.data();

        if (username) setUsername(username);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, username, setUser, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

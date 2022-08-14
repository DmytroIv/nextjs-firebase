import { useCallback, useContext, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { debounce } from 'lodash';
import { UserContext } from '@context';
import { doc, getDoc, writeBatch } from 'firebase/firestore';
import { UsernameMessage } from '@components';
import { db } from '@db';

export const UsernameForm = () => {
  const [formValue, setFormValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { user, username, setUsername } = useContext(UserContext);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user?.uid) {
      console.log('in');

      const userDoc = doc(db, 'users', user.uid);
      const usernameDoc = doc(db, 'usernames', formValue);

      const batch = writeBatch(db);
      batch.set(userDoc, {
        username: formValue,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });
      batch.set(usernameDoc, { uid: user.uid });

      setUsername(formValue);

      await batch.commit();
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(db, 'usernames', username);
        const snap = await getDoc(ref);
        setIsValid(!snap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue, checkUsername]);

  return !username ? (
    <section>
      <h3>Choose Username</h3>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="myname" value={formValue} onChange={onChange} />
        <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
        <button type="submit" className="btn-green" disabled={!isValid}>
          Choose
        </button>

        <h3>Debug State</h3>
        <div>
          Username: {formValue}
          <br />
          Loading: {loading.toString()}
          <br />
          Username Valid: {isValid.toString()}
        </div>
      </form>
    </section>
  ) : null;
};

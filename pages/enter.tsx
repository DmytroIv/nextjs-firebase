import { ChangeEvent, useContext, useReducer, useCallback } from 'react';
import Router from 'next/router';
import { auth, googleAuthProvider } from '@db';
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { UserContext } from '@context';
import { Button, UsernameForm } from '@components';
import toast from 'react-hot-toast';
import { IUser } from '@interfaces/user.interface';
import classes from '@styles/Enter.module.css';

interface IUserState {
  email: string;
  password: string;
  alert?: null | IAlert;
}

enum AlertType {
  success = 'success',
  error = 'error',
}

interface IAlert {
  alertType: 'success' | 'error';
  message: string;
}

enum ActionTypes {
  SET_EMAIL = 'SET_EMAIL',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_ALERT = 'SET_ALERT',
}

type Action =
  | { type: ActionTypes.SET_EMAIL; payload: string }
  | { type: ActionTypes.SET_PASSWORD; payload: string }
  | { type: ActionTypes.SET_ALERT; payload: IAlert };

function userReducer(state: IUserState, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case ActionTypes.SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case ActionTypes.SET_ALERT:
      return {
        ...state,
        alert: { ...action.payload },
      };
    default:
      return state;
  }
}

const initState: IUserState = {
  email: '',
  password: '',
  alert: null,
};

export default function Enter(): JSX.Element {
  const { user, username, setUsername, setUser } = useContext(UserContext);
  const [{ email, password /*, alert*/ }, dispatch] = useReducer(userReducer, initState);

  const onSuccessAuth = useCallback(
    (message: string, user: IUser) => {
      dispatch({
        type: ActionTypes.SET_ALERT,
        payload: { alertType: AlertType.success, message },
      });
      toast.success(message);
      dispatch({ type: ActionTypes.SET_EMAIL, payload: '' });
      dispatch({ type: ActionTypes.SET_PASSWORD, payload: '' });
      // Router.push('/');
      setUser(user);
    },
    [setUser]
  );

  const onErrorAuth = useCallback((message: string) => {
    dispatch({
      type: ActionTypes.SET_ALERT,
      payload: { alertType: AlertType.error, message },
    });
    toast.error(message);
  }, []);

  const createNewUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const message = 'User successfully created !';
        onSuccessAuth(message, user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        onErrorAuth(errorMessage);
      });
  };

  const signInByEmailPass = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const message = 'You are signed in !';
        onSuccessAuth(message, user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        onErrorAuth(errorMessage);
      });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const type = Object.values(ActionTypes).filter((e) => e === `SET_${name.toUpperCase()}`)[0];
    if (type !== ActionTypes.SET_ALERT) {
      dispatch({ type, payload: value });
    }
  };

  const onSignOut = () => {
    setUser(null);
    setUsername(null);
    signOut(auth);
  };

  return (
    <main>
      <h1>username : {username}</h1>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <Button onClick={onSignOut}>Sign Out</Button>
        )
      ) : (
        <>
          <Button
            onClick={async () => {
              try {
                await signInWithPopup(auth, googleAuthProvider);
              } catch (err) {
                console.log(err);
              }
            }}
            className="btn-google">
            <img src={'/images/google.png'} width="30px" /> Sign in with Google
          </Button>
          <hr />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={onChangeHandler}
          />
          <br />
          <br />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={onChangeHandler}
          />
          <Button onClick={createNewUser}>Create User</Button>
          <span> OR </span>
          <Button onClick={signInByEmailPass}>Log In</Button>
        </>
      )}
    </main>
  );
}

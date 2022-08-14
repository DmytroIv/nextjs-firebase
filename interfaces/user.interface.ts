import { UserInfo } from 'firebase/auth';

export interface IUser extends UserInfo {
  uid: string;
  photoURL: string | null;
  displayName: string | null;
}

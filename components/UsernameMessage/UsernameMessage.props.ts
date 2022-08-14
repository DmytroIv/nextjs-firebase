import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IUsernameMessageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  username: string;
  isValid: boolean;
  loading: boolean;
}

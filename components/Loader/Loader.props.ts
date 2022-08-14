import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ILoaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  show: boolean;
}

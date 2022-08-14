import { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

export interface IButtonProps
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
  > {
  children: ReactNode;
}

import { IButtonProps } from './Button.props';

export const Button = ({ className, children, onClick, ...props }: IButtonProps): JSX.Element => {
  return (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  );
};

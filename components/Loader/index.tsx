import { ILoaderProps } from './Loader.props';
// import classes from './Loader.module.css';

export const Loader = ({ show }: ILoaderProps): JSX.Element | null => {
  return show ? <div className="loader"></div> : null;
};

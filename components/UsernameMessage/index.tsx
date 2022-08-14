import { IUsernameMessageProps } from './UsernameMessage.props';

export const UsernameMessage = ({ username, isValid, loading }: IUsernameMessageProps) => {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken or invalid!</p>;
  } else {
    return <p></p>;
  }
};

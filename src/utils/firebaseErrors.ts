const errorMessageFromCode = (errorCode: string): string => {
  // eslint-disable-next-line no-console
  console.log(errorCode);
  switch (errorCode) {
    case 'auth/too-many-requests':
      return 'Too many request';
      break;
    case 'auth/user-not-found':
      return 'No user found with this email';
      break;
    case 'auth/wrong-password':
      return 'Wrong password';
      break;
    case 'auth/email-already-in-use':
      return 'This email is already used';
      break;
    case 'auth/user-disabled':
      return 'User disabled';
      break;
    default:
      return errorCode;
      break;
  }
};
export default errorMessageFromCode;

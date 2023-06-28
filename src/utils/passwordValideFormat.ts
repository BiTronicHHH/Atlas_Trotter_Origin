const isPasswordValidFormat = (password: string): boolean => {
  const isLongEnough = password.length >= 6;
  const containUpper = /[A-Z]/.test(password);
  const containLower = /[a-z]/.test(password);
  const containNum = /[0-9]/.test(password);

  const specialChars = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

  const containSpecialChar = specialChars.test(password);

  return (
    isLongEnough &&
    containUpper &&
    containLower &&
    containNum &&
    containSpecialChar
  );
};

export default isPasswordValidFormat;

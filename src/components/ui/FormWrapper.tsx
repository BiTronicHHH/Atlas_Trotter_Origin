import React from 'react';

interface Props {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  className?: string;
}

const FormWrapper: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`flex small:flex-row flex-col ${className}`}>
      {children}
    </div>
  );
};

export default FormWrapper;

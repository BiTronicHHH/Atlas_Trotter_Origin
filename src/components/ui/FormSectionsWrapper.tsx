import React from 'react';

interface Props {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  className?: string;
}

const FormSectionsWrapper: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <div className={`${className} max-w-[400px] w-full flex flex-col`}>
      {children}
    </div>
  );
};

export default FormSectionsWrapper;

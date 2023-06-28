import React from 'react';

interface Props {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  className?: string;
}

const Container: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <div className={`${className} max-w-[1250px] w-full px-4 mx-auto`}>
      {children}
    </div>
  );
};

export default Container;

import React from 'react';
import Spinner from './Spinner';

const LoadingScreen = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-1">
      <Spinner />
    </div>
  );
};

export default LoadingScreen;

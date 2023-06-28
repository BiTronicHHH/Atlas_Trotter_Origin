import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex justify-center items-center my-5">
        <div className="animate-spin rounded-full tablet:h-[52px] tablet:w-[52px] h-10 w-10 border-[3px] border-r-[transparent] border-[#8c618b]"></div>
      </div>
    </div>
  );
};

export default Spinner;

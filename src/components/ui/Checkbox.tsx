import { IInput } from '@/types/Form';
import React from 'react';

const Checkbox: React.FC<IInput> = ({ label, inputProps, defaultChecked }) => {
  return (
    <div className="flex items-center">
      <input
        className="text-purple w-4 h-4 mr-2 focus:ring-indigo-400 focus:ring-opacity-25 border border-gray-300 rounded-xl cursor-pointer"
        type="checkbox"
        defaultChecked={defaultChecked}
        {...inputProps}
      />
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;

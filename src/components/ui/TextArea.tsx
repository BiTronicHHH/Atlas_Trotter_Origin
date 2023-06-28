import { IInput } from '@/types/Form';
import React from 'react';

const TextArea = ({
  placeholder,
  icon,
  className = '',
  inputProps,
  label,
  required,
  maxLength,
  rows = 6,
}: IInput) => {
  return (
    <div className="mt-1 relative rounded-md shadow-sm">
      {icon ? (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {icon}
        </div>
      ) : null}
      {label && (
        <label htmlFor={inputProps?.name}>
          <label className="mb-2">
            {label}
            {required ? <span className="text-red ml-1">*</span> : null}
          </label>
        </label>
      )}
      <textarea
        className={`${className} block w-full ${
          icon ? 'px-12' : 'px-4'
        } py-[14px] text-sm outline-none resize-none bg-secondary border-transparent border focus:border-gray2 hover:border-gray2 rounded-lg text-gray2`}
        placeholder={placeholder}
        {...inputProps}
        required={required}
        rows={rows}
        maxLength={maxLength}
      />
    </div>
  );
};

export default TextArea;

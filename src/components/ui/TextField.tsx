import { IInput } from '@/types/Form';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const Tooltip = dynamic(() => import('antd').then((module) => module.Tooltip));

const TextField = ({
  placeholder,
  icon,
  className = '',
  inputProps,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  required,
  maxLength,
  type = 'text',
  accept,
  min,
  step,
  wrapperClassname,
}: IInput) => {
  const { t } = useTranslation('common');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={wrapperClassname ? wrapperClassname : ''}>
      {label && (
        <label htmlFor={inputProps?.name}>
          <label className="mb-2">
            {label}
            {required && type != 'email' && type != 'password' ? (
              <span className="text-red ml-1">*</span>
            ) : null}
          </label>
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        {type == 'password' &&
          (showPassword ? (
            <Tooltip title={t('Hide')} placement="right">
              <EyeInvisibleOutlined
                className="absolute right-0 pr-4 cursor-pointer top-1/2 transform -translate-y-1/2"
                style={{ color: '#6b7280' }}
                onClick={() => setShowPassword(!showPassword)}
              />
            </Tooltip>
          ) : (
            <Tooltip title={t('Show')} placement="right">
              <EyeOutlined
                className="absolute right-0 pr-4 cursor-pointer top-1/2 transform -translate-y-1/2"
                style={{ color: '#6b7280' }}
                onClick={() => setShowPassword(!showPassword)}
              />
            </Tooltip>
          ))}
        <input
          className={`${className} block w-full ${
            type == 'password' ? 'pl-4 pr-10' : 'px-4'
          } ${
            icon ? 'pl-14 pr-4' : 'px-4'
          } py-[14px] text-sm outline-none max-h-[49px] bg-white border-transparent border focus:border-gray2 hover:border-gray2 rounded-lg text-gray-500`}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          type={showPassword ? 'text' : type}
          accept={accept}
          min={min}
          step={step}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
          {...inputProps}
        />
      </div>
    </div>
  );
};

export default TextField;

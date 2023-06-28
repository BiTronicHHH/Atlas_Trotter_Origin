import { FocusEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
export interface IInput {
  placeholder?: string;
  wrapperClassname?: string;
  icon?: JSX.Element;
  className?: string;
  label?: string;
  inputProps?: UseFormRegisterReturn;
  required?: boolean;
  maxLength?: number;
  type?: 'text' | 'number' | 'datetime-local' | 'password' | 'file' | 'email';
  accept?: string;
  min?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  step?: number;
  rows?: number;
  defaultChecked?: boolean;
}

export interface FormItem extends Omit<IInput, 'inputProps'> {
  name: string;
  component: 'input' | 'textArea' | 'checkBox';
}

export interface IFormSection {
  title: string;
  items: FormItem[];
  register: (name: string) => UseFormRegisterReturn;
}

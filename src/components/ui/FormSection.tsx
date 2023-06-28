import { IFormSection } from '@/types/Form';
import React from 'react';
import Checkbox from './Checkbox';
import TextArea from './TextArea';
import TextField from './TextField';

const FormSection: React.FC<IFormSection> = ({ items, title, register }) => {
  return (
    <>
      {title && title != '' && (
        <label className="mb-5 font-semibold">{title}</label>
      )}
      <div className="flex flex-col space-y-3">
        {items.map(({ component, name, ...props }) => {
          switch (component) {
            case 'input':
              return (
                <TextField
                  key={name}
                  {...props}
                  label={props.label}
                  placeholder={props.placeholder}
                  inputProps={register(name)}
                />
              );
            case 'checkBox':
              return (
                <Checkbox
                  key={name}
                  {...props}
                  label={props.label}
                  inputProps={register(name)}
                />
              );
            case 'textArea':
              return (
                <TextArea
                  key={name}
                  {...props}
                  label={props.label}
                  placeholder={props.placeholder}
                  inputProps={register(name)}
                />
              );
          }
        })}
      </div>
    </>
  );
};

export default FormSection;

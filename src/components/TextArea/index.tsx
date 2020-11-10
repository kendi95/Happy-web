import React from 'react';
import { ITextAreaProps } from '../interfaces';

import {CustomTextArea} from '../styles';

const TextArea: React.FC<ITextAreaProps> = ({label, name, value, description, onChange}) => {
  return (
    <>
      <label htmlFor={name}>{label} <span>{description}</span></label>
      <CustomTextArea 
        hasValue={value ? true : false} 
        id={name} 
        maxLength={300} 
        onChange={onChange} 
        value={value} 
      />
    </>
  );
}

export default TextArea;
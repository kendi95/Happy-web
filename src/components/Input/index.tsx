import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { IInputProps } from '../interfaces';
import {CustomInputContainer, CustomInput, CustomInputGroup} from '../styles';

const Input: React.FC<IInputProps> = ({label, name, type, isPassword = false, onClick, value, onChange, hasError = false}) => {

  const [error, setError] = useState(hasError);

  return (
    <CustomInputGroup>
      <label htmlFor={name}>{label}</label>
      <CustomInputContainer hasValue={value ? true : false} hasError={error}>
        <CustomInput 
          id={name} 
          type={type} 
          onChange={onChange} 
          value={value}
        />
        {isPassword ? (
          <button type="button" onClick={onClick}>
            {type === 'password' ? (
              <FiEye size={20} />
            ) : (
              <FiEyeOff size={20} />
            )}
          </button>
        ) : <div />}
      </CustomInputContainer>
    </CustomInputGroup>
  );
}

export default Input;
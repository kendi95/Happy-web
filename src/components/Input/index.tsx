import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { IInputProps } from '../interfaces';

import '../styles/input.css';

const Input: React.FC<IInputProps> = ({label, type, isPassword = false, onClick, value, onChange}) => {

  return (
    <div className="input-group">
      <label>{label}</label>
      <div className="input">
        <input type={type} onChange={onChange} value={value} />
        {isPassword ? (
          <button type="button" onClick={onClick}>
            {type === 'password' ? (
              <FiEye size={20} />
            ) : (
              <FiEyeOff size={20} />
            )}
          </button>
        ) : <div />}
      </div>
    </div>
  );
}

export default Input;
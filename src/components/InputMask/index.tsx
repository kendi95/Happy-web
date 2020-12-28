import React from 'react';

import {CustomInputMask, CustomInputGroup, CustomInputContainer} from '../styles';

import { IInputMaskProps } from '../interfaces';

const InputMask: React.FC<IInputMaskProps> = ({ name, label, value, hasError = false, ...props }) => {
  return (
    <CustomInputGroup>
      <label htmlFor={name}>{label}</label>
      <CustomInputContainer hasValue={value ? true : false} hasError={hasError}>
        <CustomInputMask {...props} value={value} />
      </CustomInputContainer>
    </CustomInputGroup>
  )
}

export default InputMask;
import React from 'react';

import { IButtonProps } from '../interfaces';

import {ButtonStyled} from './styles';

const Button: React.FC<IButtonProps> = ({type, label, disabled = false}) => {
  return (
    <ButtonStyled type={type} disabled={disabled}>{label}</ButtonStyled>
  );
}

export default Button;
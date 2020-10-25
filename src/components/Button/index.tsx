import React from 'react';

import { IButtonProps } from '../interfaces';

import {ButtonStyled} from './styles';

const Button: React.FC<IButtonProps> = ({type, label, disabled = false, onClick}) => {
  return (
    <ButtonStyled type={type} disabled={disabled} onClick={onClick}>{label}</ButtonStyled>
  );
}

export default Button;
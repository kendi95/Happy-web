import React from 'react';

import { IActionButtonProps } from '../interfaces';

import '../styles/action-button.css';

const ActionButton: React.FC<IActionButtonProps> = ({isConfirmation = false, text, icon, onClick}) => {
  return (
    <button onClick={onClick} className={isConfirmation ? 'confirmation-button' : 'cancel-button'}>
      {icon}
      <span>{text}</span>
    </button>
  )
}

export default ActionButton;
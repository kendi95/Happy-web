import React, { useMemo } from 'react';

import { IActionButtonProps } from '../interfaces';

import '../styles/action-button.css';

const ActionButton: React.FC<IActionButtonProps> = ({
  isConfirmation = false, 
  text, 
  icon, 
  onClick, 
  isDone = false
}) => {

  const buttonClassName= useMemo(() => {
    if (isConfirmation) {
      return 'confirmation-button';
    }
    if (isDone) {
      return 'done-button';
    }
    return 'cancel-button';
  }, [isConfirmation, isDone]);

  return (
    <button onClick={onClick} className={buttonClassName}>
      {icon}
      <span style={{color: '#fff'}}>{text}</span>
    </button>
  )
}

export default ActionButton;
import styled from 'styled-components';
import {lighten} from 'polished';

interface ButtonProps {
  disabled?: boolean;
}

export const ButtonStyled = styled.button`
  width: 100%;
  height: 64px;
  background: ${(props: ButtonProps) => !props.disabled ? `${lighten(0.2, '#37C77F')}` : '#9BF0C6'};
  border-radius: 20px;
  margin-top: 40px;
  border: 0;
  cursor: pointer;

  color: #fff;
  transition: background 0.2s;

  &:hover {
    background: ${(props: ButtonProps) => !props.disabled ? '#208a55' : ''};
    /* background: #208a55; */
  }

  &:focus {
   outline: none;
  }
`;
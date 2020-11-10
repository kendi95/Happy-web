import { TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';
import { ICustomInputContainerProps, ICustomTextAreaProps } from '../interfaces';

export const CustomInputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;

  & + & {
    margin-top: 24px;
  }

  label {
    font-size: 16px;
    color: #8fa7b2;
    font-weight: 600;
    margin-bottom: 4px;
  }
`;

export const CustomTextArea = styled.textarea<ICustomTextAreaProps>`
  width: 100%;
  background: #f5f8fa;
  border: 1px solid ${({ hasValue }) => hasValue ? '#a1e9c5' : '#d3e2e5'};
  border-radius: 20px;
  outline: none;
  color: #5c8599;

  min-height: 120px;
  max-height: 240px;
  resize: vertical;
  padding: 16px;
  line-height: 28px;
  transition: border 0.2s;

  margin-bottom: 16px;

  &:hover {
    outline: none;
    border: 2px solid #15c3d6;
  }
`;

export const CustomInputContainer = styled.div<ICustomInputContainerProps>`
  width: 100%;
  height: 64px;
  background: #f5f8fa;
  border: 1px solid ${({ hasValue }) => hasValue ? '#a1e9c5' : '#d3e2e5'};
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: border 0.1s;

  &:hover {
    border: 2px solid #15c3d6;
  }

  &:focus {
    border: 2px solid #15c3d6;
  }

  button {
    background: transparent;
    width: 10%;
    height: 60px;
    margin-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;

    &:focus {
      outline: none;
    }

    svg {
      color: #8fa7b2;
      transition: color 0.2s;

      &:hover {
        color: #15c3d6;
      }
    }
  }
`;

export const CustomInput = styled.input`
  width: 100%;
  height: 100%;
  background: #f5f8fa;
  border-radius: 20px;
  outline: none;
  color: #5c8599;
  border: 0;
`;

export const CustomAside = styled.aside`
  position: fixed;
  height: 100%;
  padding: 32px 24px;
  background: linear-gradient(329.54deg, #15b6d6 0%, #15d6d6 100%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  img {
    width: 48px;
  }

  main, div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  main a {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 16px;
  }

  main a + a {
    margin-top: 16px;
  }

  footer a, footer button {
    width: 48px;
    height: 48px;

    border: 0;

    background: #12afcb;
    border-radius: 16px;

    cursor: pointer;

    transition: background-color 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  footer a:hover, footer button:hover {
    background: #17d6eb;
  }

  footer button:focus {
    outline: none;
  }
`;
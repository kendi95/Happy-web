import { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import {Props} from 'react-input-mask';
import { IOrphanage } from "../../interfaces";

export interface ICustomTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasValue: boolean
}

export interface ICustomInputContainerProps {
  hasValue: boolean
  hasError: boolean;
}

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  isPassword?: boolean;
  hasError?: boolean;
  onClick?: () => void
}

export interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  description?: string;
  name: string;
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
}

export interface IRestrictedAccessProps {
  to?: string;
  isResetPasswordPage?: boolean;
}

export interface ISidebarProps {
  isDashboard?: boolean;
}

export interface ICardOrphanageProps {
  isPending?: boolean;
  orphanage: IOrphanage;
}

export interface IActionButtonProps {
  isConfirmation?: boolean;
  isDone?: boolean;
  text: string;
  icon?: React.ReactNode
  onClick: () => void;
}

export interface IInputMaskProps extends Props{
  label: string;
  hasError?: boolean;
}
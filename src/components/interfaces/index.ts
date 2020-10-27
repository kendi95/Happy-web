import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isPassword?: boolean;
  onClick?: () => void
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
}
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

export interface IActionButtonProps {
  isConfirmation?: boolean;
  text: string;
  icon?: React.ReactNode
  onClick: () => void;
}
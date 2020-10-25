import React, { useCallback, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import RestrictedAccess from '../../components/RestrictedAccess';

const ResetPassword: React.FC = () => {
  const [inputTypeNewPassword, setInputTypeNewPassword] = useState('password');
  const [inputTypeRepeatassword, setInputTypeRepeatPassword] = useState('password');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleShowOrHideNewPassword = useCallback(() => {
    setInputTypeNewPassword(oldValue => {
      if (oldValue === 'password') {
        return 'text';
      }
      return 'password';
    })
  }, []);

  const handleShowOrHideRepeatPassword = useCallback(() => {
    setInputTypeRepeatPassword(oldValue => {
      if (oldValue === 'password') {
        return 'text';
      }
      return 'password';
    })
  }, []);

  return (
    <RestrictedAccess isResetPasswordPage={true}>
      <form onSubmit={() => {}}>
        <h1>Redefinição de senha</h1>
        <h3>Escolha uma nova senha para você acessar o dashboard do Happy</h3>
        <Input 
          label="Nova senha" 
          type={inputTypeNewPassword} 
          maxLength={8} 
          isPassword 
          onClick={handleShowOrHideNewPassword} 
          value={newPassword} 
          onChange={e => setNewPassword(e.target.value)} 
        />
        <Input 
          label="Repetir senha" 
          type={inputTypeRepeatassword} 
          maxLength={8} 
          isPassword 
          onClick={handleShowOrHideRepeatPassword} 
          value={repeatPassword} 
          onChange={e => setRepeatPassword(e.target.value)} 
        />

        <Button label="Prosseguir" type="button" disabled={newPassword && repeatPassword ? false : true} />
      </form>
      </RestrictedAccess>
  )
}

export default ResetPassword;
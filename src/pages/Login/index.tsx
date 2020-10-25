import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

import Input from '../../components/Input';

import RestrictedAccess from '../../components/RestrictedAccess';

import '../styles/login.css';

const Login: React.FC = () => {
  const [checked, setChecked] = useState(false)
  const [inputType, setInputType] = useState('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isDisabled = useMemo(() => {
    if (email && password) {
      return false;
    }
    return true;
  }, [email, password]);

  const handleShowOrHidePassword = useCallback(() => {
    setInputType(oldValue => {
      if (oldValue === 'password') {
        return 'text';
      }
      return 'password';
    })
  }, []);

  return (
    <RestrictedAccess to="/">
      <form onSubmit={() => {}}>
        <h1>Fazer login</h1>
        <Input 
          label="Email" 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)}
        />
        <Input 
          label="Senha" 
          type={inputType} 
          maxLength={8} 
          isPassword 
          onClick={handleShowOrHidePassword} 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />

        <div className="remember-forgot-container">
          <div className="checkbox-container">
            <input 
              id="checkbox" 
              type="checkbox" 
              className="checkbox" 
              defaultChecked={checked} 
              onChange={e => setChecked(e.target.checked)} 
            />
            <label htmlFor="checkbox">Lembrar-me</label>
          </div>

          <Link to="/forgot-password">Esqueci minha senha</Link>
        </div>

        <Button label="Entrar" type="button" disabled={isDisabled} />
      </form>
    </RestrictedAccess>
  );
}

export default Login;
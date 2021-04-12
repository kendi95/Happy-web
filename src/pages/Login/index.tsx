import React, { FormEvent, useCallback, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';

import api from '../../services/api';

import Button from '../../components/Button';
import Input from '../../components/Input';
import RestrictedAccess from '../../components/RestrictedAccess';

import '../styles/login.css';
import options from '../../utils/snackbarOptions';

const Login: React.FC = () => {
  const {push} = useHistory();
  const [checked, setChecked] = useState(false)
  const [inputType, setInputType] = useState('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar] = useSnackbar(options);

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

  const handleLogin = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    
    try {
      const response = await api.post('/sessions', {email, password});
      const {user, token} = response.data
      localStorage.setItem('@happy/token', token)
      push('/dashboard/registered-orphanages');
    } catch (error) {
      if (error.response.data.errors instanceof Object) {
        const {email, password} = error.response.data.errors;
        openSnackbar(`${email || ''} ${password || ''}`);
        return;
      }
      openSnackbar(`${error.response.data.errors}`);
    }
    
  }, [openSnackbar, email, password, push]);

  return (
    <RestrictedAccess to="/">
      <form onSubmit={handleLogin}>
        <h1>Fazer login</h1>
        <Input 
          name="email"
          label="Email" 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          name="password"
          label="Senha" 
          type={inputType}
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

        <Button label="Entrar" type="submit" disabled={isDisabled} />
      </form>
    </RestrictedAccess>
  );
}

export default Login;
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';
import RestrictedAccess from '../../components/RestrictedAccess';

import '../styles/forgot-password.css';

const ForgotPassword: React.FC = () => {
  const {push} = useHistory();
  const [email, setEmail] = useState('');

  return (
    <RestrictedAccess to="/login">
      <form onSubmit={() => {}}>
        <h1>Esqueci a senha</h1>
        <h3>Sua redefinição de senha será enviada para o e-mail cadastrado.</h3>
        <Input 
          name="email"
          label="Email" 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)}
        />

        <Button 
          label="Prosseguir" 
          type="button" 
          disabled={email ? false : true}
          onClick={() => push('/reset-password')}
        />
      </form>
      </RestrictedAccess>
  );
}

export default ForgotPassword;
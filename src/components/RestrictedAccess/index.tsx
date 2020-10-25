import React from 'react';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import logoBigger from '../../assets/logo-bigger.svg';

import { IRestrictedAccessProps } from '../interfaces';
import '../styles/restricted-access.css';

const RestrictedAccess: React.FC<IRestrictedAccessProps> = ({to = '', isResetPasswordPage = false, children}) => {
  return (
    <div id="page-restricted-access">
      <div className="logo-container">
        <img src={logoBigger} alt="Happy" />
        <strong>Londrina</strong>
        <span>Paraná</span>
      </div>

      <div className="form-container">
        {!isResetPasswordPage && (
          <Link to={to}>
            <FiArrowLeft size={24} />
          </Link>
        )}

        {children}
      </div>
    </div>
  );
}

export default RestrictedAccess;
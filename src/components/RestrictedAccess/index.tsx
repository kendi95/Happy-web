import React from 'react';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import '../styles/restricted-access.css';

const RestrictedAccess: React.FC = ({children}) => {
  return (
    <div id="page-restricted-access">
      <div className="logo-container">
        <img src={require('../../assets/logo-bigger.svg')} alt="Happy" />
        <strong>Londrina</strong>
        <span>Paraná</span>
      </div>

      <div className="form-container">
        <Link to="/">
          <FiArrowLeft size={24} />
        </Link>

        {children}
      </div>
    </div>
  );
}

export default RestrictedAccess;
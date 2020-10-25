import React from 'react';
import {FiArrowRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';

import logo from '../../assets/logo.svg';

import '../styles/landing.css';

const Landing: React.FC = () => {
  return (
    <div id="page-landing">
    <div className="content-wrapper">
      <div className="logo-landing-container">
        <img src={logo} alt="Happy"/>

        <div className="location">
          <strong>Londrina</strong>
          <span>Paraná</span>
        </div>
      </div>

      <main>
        <h1>Leve felicidae para o mundo</h1>
        <p>Visite orfanatos e mude o dia de muitas crianças.</p>
      </main>

      <div className="restricted-access">
        <Link to="/login">
          <strong>Acesso restrito</strong>
        </Link>
      </div>

      <Link to="/app" className="enter-app"> 
        <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
       </Link> 
    </div>
  </div>
  );
}

export default Landing;
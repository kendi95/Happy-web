import React from 'react';
import {FiArrowRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';

import '../../styles/pages/landing.css';

const Landing: React.FC = () => {
  return (
    <div id="page-landing">
    <div className="content-wrapper">
      <img src={require('../../assets/logo.svg')} alt="Happy"/>

      <main>
        <h1>Leve felicidae para o mundo</h1>
        <p>Visite orfanatos e mude o dia de muitas crianças.</p>
      </main>

      <div className="location">
        <strong>Londrina</strong>
        <span>Paraná</span>
      </div>

      <Link to="/apps" className="enter-app"> 
        <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
       </Link> 
    </div>
  </div>
  );
}

export default Landing;
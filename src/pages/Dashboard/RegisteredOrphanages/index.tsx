import React from 'react';

import Sidebar from '../../../components/Sidebar';

import '../../styles/Dashboard/registered-orphanages.css';
import CardOrphanage from '../../../components/CardOrphanage';

const RegisteredOrphanages: React.FC = () => {
  return (
    <div className="registered-dashboard">
      <div className="sidebar">
        <Sidebar isDashboard />
      </div>
      
      <section>
        <header>
          <h1>Orfanatos cadastrados</h1>
          <span>2 orfanatos</span>
        </header>

        <div className="devider" />

        <div className="orphanages-dashboard">
         <CardOrphanage />
         <CardOrphanage />
         <CardOrphanage />
         <CardOrphanage />
         <CardOrphanage />
        </div>
      </section>
    </div>
  );
}

export default RegisteredOrphanages;
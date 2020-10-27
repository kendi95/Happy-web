import React from 'react';
import CardOrphanage from '../../../components/CardOrphanage';
import Sidebar from '../../../components/Sidebar';

import '../../styles/Dashboard/pending-orphanages.css';

const PendingOrphanages: React.FC = () => {
  return (
    <div className="pending-dashboard">
      <div className="sidebar">
        <Sidebar isDashboard />
      </div>
      
      <section>
        <header>
          <h1>Cadastros pendentes</h1>
          <span>2 orfanatos</span>
        </header>

        <div className="devider" />

        <div className="orphanages-dashboard">
         <CardOrphanage isPending />
         <CardOrphanage isPending />
         <CardOrphanage isPending />
         <CardOrphanage isPending />
         <CardOrphanage isPending />
        </div>
      </section>
    </div>
  );
}
export default PendingOrphanages;
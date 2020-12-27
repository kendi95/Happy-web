import React, { useEffect, useState } from 'react';

import CardOrphanage from '../../../components/CardOrphanage';
import Sidebar from '../../../components/Sidebar';

import { IOrphanage } from '../../../interfaces';

import api from '../../../services/api';

import '../../styles/Dashboard/pending-orphanages.css';

const PendingOrphanages: React.FC = () => {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

  useEffect(() => {
    async function getOrphanagesOnPending() {
      try {
        const token = localStorage.getItem('@happy/token');

        const response = await api.get('/orphanages', {
          params: {
            pending: true
          },
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        setOrphanages(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    getOrphanagesOnPending();
  }, []);

  return (
    <div className="pending-dashboard">
      <div className="sidebar">
        <Sidebar isDashboard />
      </div>
      
      <section>
        <header>
          <h1>Cadastros pendentes</h1>
          <span>{orphanages.length} orfanatos</span>
        </header>

        <div className="devider" />

        {orphanages.map(orphanage => (
          <div className="orphanages-dashboard">
            <CardOrphanage isPending orphanage={orphanage} />
          </div>
        ))}
      </section>
    </div>
  );
}
export default PendingOrphanages;
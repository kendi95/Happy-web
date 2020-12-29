import React, { useEffect, useState } from 'react';

import CardOrphanage from '../../../components/CardOrphanage';
import Sidebar from '../../../components/Sidebar';

import { IOrphanage } from '../../../interfaces';

import api from '../../../services/api';

import noContent from '../../../assets/no-content.svg';
import '../../styles/Dashboard/pending-orphanages.css';

const PendingOrphanages: React.FC = () => {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

  useEffect(() => {
    async function getOrphanagesOnPending() {
      try {
        const token = localStorage.getItem('@happy/token');

        const response = await api.get('/orphanages', {
          params: {
            status: 'PENDING'
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
          {orphanages.length > 0 && (
            <span>{orphanages.length} orfanatos</span>
          )}
        </header>

        <div className="devider" />

        {orphanages.map(orphanage => (
          <div className="orphanages-dashboard">
            <CardOrphanage isPending orphanage={orphanage} />
          </div>
        ))}

        {orphanages.length === 0 && (
          <div className="no-content-container">
            <img src={noContent} alt="Sem conteúdo" />
            <span>Nenhum no momento</span>
          </div>
        )}
      </section>
    </div>
  );
}
export default PendingOrphanages;
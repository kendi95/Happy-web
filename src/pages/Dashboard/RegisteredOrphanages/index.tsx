import React, { useEffect, useState } from 'react';

import api from '../../../services/api';
import { IOrphanage } from '../../../interfaces';

import Sidebar from '../../../components/Sidebar';
import CardOrphanage from '../../../components/CardOrphanage';

import noContent from '../../../assets/no-content.svg';
import '../../styles/Dashboard/registered-orphanages.css';

const RegisteredOrphanages: React.FC = () => {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

  useEffect(() => {
    async function getOrphanages() {
      try {
        const token = localStorage.getItem('@happy/token');

        const response = await api.get('/orphanages', {
          params: {
            status: 'CONFIRMED',
          },
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setOrphanages(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOrphanages();
  }, []);

  return (
    <div className="registered-dashboard">
      <div className="sidebar">
        <Sidebar isDashboard />
      </div>
      
      <section>
        <header>
          <h1>Orfanatos cadastrados</h1>
          {orphanages.length > 0 && (
            <span>{orphanages.length} orfanato{orphanages.length > 1 ? 's' : ''}</span>
          )}
        </header>

        <div className="devider" />

        {orphanages.map(orphanage => (
          <div className="orphanages-dashboard">
            <CardOrphanage orphanage={orphanage} />
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

export default RegisteredOrphanages;
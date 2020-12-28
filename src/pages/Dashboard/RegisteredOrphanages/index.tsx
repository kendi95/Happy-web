import React, { useEffect, useState } from 'react';

import api from '../../../services/api';
import { IOrphanage } from '../../../interfaces';

import Sidebar from '../../../components/Sidebar';
import CardOrphanage from '../../../components/CardOrphanage';

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
          <span>2 orfanatos</span>
        </header>

        <div className="devider" />

        {orphanages.map(orphanage => (
          <div className="orphanages-dashboard">
            <CardOrphanage orphanage={orphanage} />
          </div>
        ))}
      </section>
    </div>
  );
}

export default RegisteredOrphanages;
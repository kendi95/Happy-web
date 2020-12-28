import React, { useCallback, useEffect, useMemo, useState } from  'react';
import {FiArrowLeft, FiMapPin, FiAlertCircle, FiPower} from 'react-icons/fi';
import { useHistory, Link, useLocation } from 'react-router-dom';

import {Badge, CustomAside} from '../styles';

import mapMarker from '../../assets/map-marker.svg';
import { ISidebarProps } from '../interfaces';
import { IOrphanage } from '../../interfaces';
import api from '../../services/api';

const Sidebar: React.FC<ISidebarProps> = ({isDashboard = false}) => {
  const {goBack, push} = useHistory();
  const {pathname} = useLocation();

  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

  const route = useMemo(() => {
    const path = pathname.split('/')[2];
    return path;
  }, [pathname]);

  const handleBackOrLogOut = useCallback(() => {
    if (!isDashboard) {
      return goBack();
    }
    return push('/login');
  }, [isDashboard, goBack, push]);

  const handleClearCountOfOrphanagesInPending = useCallback(() => {
    setOrphanages([]);
  }, []);

  useEffect(() => {
    async function getOrphanagesOnPending() {
      try {
        const token = localStorage.getItem('@happy/token');

        const response = await api.get('/orphanages', {
          params: {
            status: 'PENDING',
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

    if (route !== 'pending-orphanages') {
      getOrphanagesOnPending();
    }
  }, [route]);

  return (
    <CustomAside>
      <img src={mapMarker} alt="Happy" />

      {isDashboard ? (
        <main>
          <Link
            to="/dashboard/registered-orphanages" 
            style={{
              background: route === 'registered-orphanages' ? '#FFD666' : '#12AFCB'
            }}
          >
            <FiMapPin size={24} color={route === 'registered-orphanages' ? '#0089A5' : '#fff'} />
          </Link>

          {orphanages.length > 0 && (
            <Badge>{orphanages.length}</Badge>
          )}
          <Link 
            to="/dashboard/pending-orphanages" 
            onClick={handleClearCountOfOrphanagesInPending}
            style={{
              marginTop: '24%',
              background: route === 'pending-orphanages' ? '#FFD666' : '#12AFCB'
            }}
          >
            <FiAlertCircle size={24} color={route === 'pending-orphanages' ? '#0089A5' : '#fff'} />
          </Link>
        </main>
      ) : <div />}

      <footer>
        <button type="button" onClick={handleBackOrLogOut}>
          {isDashboard ? (
            <FiPower size={24} color="#fff" />
          ) : (
            <FiArrowLeft size={24} color="#FFF" />
          )}
        </button>
      </footer>
    </CustomAside>
  );
}

export default Sidebar
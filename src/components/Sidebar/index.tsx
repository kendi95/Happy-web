import React, { useCallback, useMemo } from  'react';
import {FiArrowLeft, FiMapPin, FiAlertCircle, FiPower} from 'react-icons/fi';
import { useHistory, Link, useLocation } from 'react-router-dom';

import mapMarker from '../../assets/map-marker.svg';
import { ISidebarProps } from '../interfaces';

import '../styles/sidebar.css';

const Sidebar: React.FC<ISidebarProps> = ({isDashboard = false}) => {
  const {goBack, push} = useHistory();
  const {pathname} = useLocation();

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

  return (
    <aside className="app-sidebar">
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
          <Link 
            to="/dashboard/pending-orphanages" 
            style={{
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
    </aside>
  );
}

export default Sidebar
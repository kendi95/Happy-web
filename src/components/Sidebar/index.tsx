import React from  'react';
import {FiArrowLeft} from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import '../../styles/components/sidebar.css';

const Sidebar: React.FC = () => {
  const {goBack} = useHistory();

  return (
    <aside className="app-sidebar">
        <img src={require('../../assets/map-marker.svg')} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
  );
}

export default Sidebar
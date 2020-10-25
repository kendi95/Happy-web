import React, { useEffect, useState } from  'react';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import '../../styles/pages/orphanages-map.css';
import api from '../../services/api';
import {Orphanage} from '../../interfaces';

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    async function getOrphanages() {
      const response = await api.get('/orphanages');
      setOrphanages(response.data);
    }

    getOrphanages();
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={require('../../assets/map-marker.svg')} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Londrina</strong>
          <span>Paraná</span>
        </footer>
      </aside>

      <Map center={[-23.3184005, -51.1480857]} zoom={15} style={{
        width: '100%',
        height: '100%',
      }}>
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
        {orphanages && orphanages.map(orphanage => (
          <Marker key={orphanage.id} position={[orphanage.latitude, orphanage.longitude]} icon={require('../../utils/mapIcon')}>
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#fff" />
              </Link>
            </Popup>
          </Marker>

        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
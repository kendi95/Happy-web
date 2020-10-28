import React from 'react';
import { FiEdit3, FiTrash, FiArrowRight } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';

import mapIcon from '../../utils/mapIcon';
import { ICardOrphanageProps } from '../interfaces';

import '../styles/card-orphanage.css';

const CardOrphanage: React.FC<ICardOrphanageProps> = ({isPending = false}) => {
  return (
    <div className="card">
      <Map
        className="card-map" 
        center={[-23.3184005, -51.1480857]} 
        zoom={16}
        dragging={false}
        touchZoom={false}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        style={{
        width: '100%',
        height: '100%',
        }}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
        <Marker 
          position={[-23.3184005, -51.1480857]} 
          icon={mapIcon} />
      </Map>
      <footer className="card-footer-container">
        <h2>Orf. Esperança</h2>

        <div className="card-footer">
          {!isPending ? (
            <>
              <Link to="" className="card-link-edit">
                <FiEdit3 size={24} />
              </Link>
              <Link to="/dashboard/exclude-orphanage" className="card-link-remove">
                <FiTrash size={24} />
              </Link>
            </>
          ) : (
            <Link to="" className="card-link-edit">
              <FiArrowRight size={24} />
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}

export default CardOrphanage;
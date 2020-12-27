import React from 'react';
import { FiEdit3, FiTrash, FiArrowRight } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';

import mapIcon from '../../utils/mapIcon';
import { ICardOrphanageProps } from '../interfaces';

import '../styles/card-orphanage.css';

const CardOrphanage: React.FC<ICardOrphanageProps> = ({isPending = false, orphanage}) => {
  return (
    <div className="card">
      <Map
        className="card-map" 
        center={[orphanage.latitude, orphanage.longitude]} 
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
          position={[orphanage.latitude, orphanage.longitude]} 
          icon={mapIcon} />
      </Map>
      <footer className="card-footer-container">
        <h2>{orphanage.name}</h2>

        <div className="card-footer">
          {!isPending ? (
            <>
              <Link to="/dashboard/edit-orphanages" className="card-link-edit">
                <FiEdit3 size={24} />
              </Link>
              <Link to="/dashboard/exclude-orphanages" className="card-link-remove">
                <FiTrash size={24} />
              </Link>
            </>
          ) : (
            <Link to={`/dashboard/pending-orphanages/${orphanage.id}`} className="card-link-edit">
              <FiArrowRight size={24} />
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}

export default CardOrphanage;
import React, {useEffect, useMemo, useState} from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import { Orphanage, OrphanageParams } from "../../interfaces";
import api from "../../services/api";

import '../../styles/pages/orphanage.css';

const Orphanage: React.FC = () => {
  const { id } = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const latiLongi = useMemo(() => {
    if (orphanage) {
      return {
        latitude: orphanage.latitude,
        longitude: orphanage.longitude
      }
    }
    return {
      latitude: -23.3184005,
      longitude: -51.1480857
    }
  }, [orphanage])

  useEffect(() => {
    async function getOrphanages() {
      const response = await api.get(`/orphanages/${id}`);
      setOrphanage(response.data);
    }

    getOrphanages();
  }, [id]);

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage?.images[activeImageIndex].url} alt="Lar das meninas" />

          <div className="images">
            {orphanage?.images.map((image, index) => (
              <button onClick={() => setActiveImageIndex(index)} className={activeImageIndex === index ? 'active' : ''} type="button" key={image.id}>
                <img src={image.url} alt="Lar das meninas" />
              </button>
            ))}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage?.name}</h1>
            <p>{orphanage?.about}</p>

            <div className="map-container">
              <Map 
                center={[latiLongi.latitude, latiLongi.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={require('../../utils/mapIcon')} position={[latiLongi.latitude, latiLongi.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${latiLongi.latitude},${latiLongi.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>{orphanage?.instructions}</h2>
            <p>Venha como se sentir mais à vontade e traga muito amor para dar.</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage?.opening_hours}
              </div>
              {orphanage?.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#ff6690" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Orphanage
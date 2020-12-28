import React, { useCallback, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import { FiXCircle, FiCheck, FiX } from "react-icons/fi";
import { useHistory, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import ActionButton from "../../components/ActionButton";
import InputMask from "../../components/InputMask";

import mapIcon from '../../utils/mapIcon';
import api from "../../services/api";

import { IOrphanageParams, IImage } from "../../interfaces";

import '../styles/orphanage-details.css';

const OrphanageDetails: React.FC = () => {
  const token = localStorage.getItem('@happy/token');

  const {goBack} = useHistory();
  const { id } = useParams<IOrphanageParams>();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openHours, setOpenHours] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [previewImages, setPreviewImages] = useState<IImage[]>([]);
  const [whatsapp, setWhatsapp] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng
    });
  }, []);

  const handleDeleteImage = useCallback(async (positionIndex, imageId) => {
    try {
      await api.delete(`/images/${imageId}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      
      setPreviewImages(oldPreviewImages => {
        const oldImages = oldPreviewImages.filter((_, index) => index !== positionIndex);
        return oldImages;
      });
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const handleConfirmation = useCallback(async () => {
    try {
      await api.patch(`/orphanages/${id}`, {
        status: 'CONFIRMED'
      }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      // push('/dashboard/pending-orphanages');
      goBack();
    } catch (error) {
      console.log(error);
    }
  }, [id, goBack, token]);

  const handleCancelation = useCallback(async () => {
    try {
      await api.patch(`/orphanages/${id}`, {
        status: 'CANCELED'
      }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      // push('/dashboard/pending-orphanages');
      goBack();
    } catch (error) {
      console.log(error);
    }
  }, [id, goBack, token]);

  useEffect(() => {
    async function getOrphanageById() {
      try {
        const response = await api.get(`/orphanages/${id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        const { 
          name, 
          latitude, 
          longitude, 
          about, 
          telephone, 
          whatsapp, 
          images, 
          instructions, 
          opening_hours,
          open_on_weekends
        } = response.data;

        setName(name);
        setPosition({ latitude, longitude });
        setAbout(about);
        setTelephone(telephone);
        setWhatsapp(whatsapp);
        setInstructions(instructions);
        setOpenHours(opening_hours);
        setOpenOnWeekends(open_on_weekends);
        setPreviewImages(images);
      } catch (error) {
        console.log(error);
      }
    }

    getOrphanageById()
  }, [id, token]);

  return (
    <div id="page-detail-orphanage">
      <Sidebar />

      <main>
        {name && (
          <span>Confirmação de cadastro de {name}</span>
        )}

        <form className="detail-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[position.latitude, position.longitude]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />
              )}
            </Map>

            <Input
              name="name"
              label="Nome" 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)}
              readOnly
            />

            <div className="input-block">
              <TextArea 
                name="about"
                label="Sobre"
                description="Máximo de 300 caracteres"
                value={about}
                maxLength={300} 
                onChange={e => setAbout(e.target.value)} 
                readOnly
              />
            </div>

            <InputMask 
              mask="(99) 99999-9999"
              label="Número de Whatsapp" 
              name="whatsapp"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              readOnly
            />

            <InputMask 
              mask="(99) 9999-9999"
              label="Número de telefone" 
              name="telephone"
              value={telephone}
              onChange={e => setTelephone(e.target.value)}
              readOnly
            />

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => (
                  <div className="image">
                    <img src={image.url} key={image.id} alt={image.url} />
                    <button onClick={() => handleDeleteImage(index, image.id)} type="button">
                      <FiX size={18} color="#FF669D" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <TextArea 
                name="instructions"
                label="Instruções"
                value={instructions}
                onChange={e => setInstructions(e.target.value)} 
                readOnly
              />
            </div>

            <Input 
              name="opening_hours"
              label="Horário de funcionamento" 
              type="text" 
              value={openHours} 
              onChange={e => setOpenHours(e.target.value)}
              readOnly
            />

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  onClick={() => setOpenOnWeekends(true)} 
                  type="button" 
                  className={openOnWeekends ? 'active' : ''}>Sim</button>
                <button 
                  onClick={() => setOpenOnWeekends(false)} 
                  type="button" 
                  className={!openOnWeekends ? 'active' : ''}>Não</button>
              </div>
            </div>
          </fieldset>

          <footer>
            <ActionButton 
              text="Recusar" 
              icon={<FiXCircle size={20} color="#fff" />} 
              onClick={handleCancelation} 
            />
            <ActionButton 
              text="Aceitar" 
              isDone
              icon={<FiCheck size={20}color="#fff" />} 
              onClick={handleConfirmation}
            />
          </footer>
        </form>
      </main>
    </div>
  );
}

export default OrphanageDetails;
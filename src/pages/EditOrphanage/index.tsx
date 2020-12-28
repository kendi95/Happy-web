import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import { FiPlus, FiX } from "react-icons/fi";
import { useHistory, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import InputMask from "../../components/InputMask";
// import {OrphanagePage} from '../styles';

import mapIcon from '../../utils/mapIcon';
import api from "../../services/api";

import {IOrphanage, IOrphanageParams} from '../../interfaces';

import '../styles/edit-orphanage.css';

const EditOrphanage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<IOrphanageParams>();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openHours, setOpenHours] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [whatsapp, setWhatsapp] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng
    });
  }, [])

  const handleSelectedImages = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    })

    setPreviewImages(oldPreviewImages => [...oldPreviewImages, ...selectedImagesPreview]);

  }, []);

  const handleDeleteImage = useCallback((positionIndex) => {
    setPreviewImages(oldPreviewImages => {
      return oldPreviewImages.splice(positionIndex, 1);
    });

    setImages(oldImages => {
      return oldImages.splice(positionIndex, 1);
    })
  }, [])

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    try {
      const {latitude, longitude} = position;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('about', about);
      formData.append('latitude', String(latitude));
      formData.append('longitude', String(longitude));
      formData.append('instructions', instructions);
      formData.append('open_on_weekends', String(openOnWeekends));
      formData.append('opening_hours', openHours);
      images.forEach(image => {
        formData.append('images', image);
      })


      await api.post('/orphanages', formData);
      history.push('/orphanages/create/done');
    } catch (error) {
      alert('Houve um erro ao realizar o cadastro do orfanato.');
    }
  }, [about, history, images, instructions, name, openHours, openOnWeekends, position]);

  useEffect(() => {
    async function getOrphanageById() {
      try {
        const token = localStorage.getItem('@happy/token');

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
      } catch (error) {
        console.log(error);
      }
    }

    getOrphanageById()
  }, [id]);

  return (
    <div id="page-edit-orphanage">
      <Sidebar />

      <main>
        {name && (
          <span>Editar perfil de {name}</span>
        )}

        <form onSubmit={handleSubmit} className="edit-orphanage-form">
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
            />

            <div className="input-block">
              <TextArea 
                name="about"
                label="Sobre"
                description="Máximo de 300 caracteres"
                value={about}
                maxLength={300} 
                onChange={e => setAbout(e.target.value)} 
              />
            </div>

            <InputMask 
              mask="(99) 99999-9999"
              label="Número de Whatsapp" 
              name="whatsapp"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
            />

            <InputMask 
              mask="(99) 9999-9999"
              label="Número de telefone" 
              name="telephone"
              value={telephone}
              onChange={e => setTelephone(e.target.value)}
            />

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => (
                  <div className="image">
                    <img src={image} key={image} alt={image} />
                    <button onClick={() => handleDeleteImage(index)} type="button">
                      <FiX size={18} color="#FF669D" />
                    </button>
                  </div>
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple onChange={handleSelectedImages} type="file" id="image[]" />
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
              />
            </div>

            <Input 
              name="opening_hours"
              label="Horário de funcionamento" 
              type="text" 
              value={openHours} 
              onChange={e => setOpenHours(e.target.value)}
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

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

export default EditOrphanage;
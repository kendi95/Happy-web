import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import '../../styles/pages/create-orphanage.css';
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

const CreateOrphanage: React.FC = () => {
  const history = useHistory();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openHours, setOpenHours] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

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

    setPreviewImages(selectedImagesPreview);

  }, []);

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
      alert('Cadastro realizado com sucesso.');
      history.push('/app');
    } catch (error) {
      alert('Houve um erro ao realizar o cadastro do orfanato.');
    }
  }, [position, name, about, instructions, openOnWeekends, openHours, images, history]);

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker interactive={false} icon={require('../../utils/mapIcon')} position={[position.latitude, position.longitude]} />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" onChange={e => setName(e.target.value)} value={name} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} onChange={e => setAbout(e.target.value)} value={about} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => (
                  <img src={image} key={image} alt={image} />
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
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" onChange={e => setInstructions(e.target.value)} value={instructions} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" onChange={e => setOpenHours(e.target.value)} value={openHours} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button onClick={() => setOpenOnWeekends(true)} type="button" className={openOnWeekends ? 'active' : ''}>Sim</button>
                <button onClick={() => setOpenOnWeekends(false)} type="button" className={!openOnWeekends ? 'active' : ''}>Não</button>
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

export default CreateOrphanage
// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;

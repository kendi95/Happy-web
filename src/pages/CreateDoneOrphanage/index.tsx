import React from 'react';
import { useHistory } from 'react-router-dom';

import ActionButton from '../../components/ActionButton';

import doneOrphanage from '../../assets/done-orphanage.svg';

import '../styles/done-orphanage.css';

const CreateDoneOrphanage: React.FC = () => {
  const {replace} = useHistory();

  return (
    <div id="done-container">
      <div className="done-actions-container">
        <h1>Ebaaa!</h1>
        <span>O cadastro deu certo e foi enviado
ao administrador para ser aprovado.
Agora é só esperar :)</span>

        <div className="buttons-container">
          <ActionButton 
            isDone 
            text="Voltar para o mapa" 
            onClick={() => replace('/app')} 
          />
        </div>
      </div>

      <img src={doneOrphanage} alt="Criação orfanato com sucesso." />
    </div>
  );
}

export default CreateDoneOrphanage;
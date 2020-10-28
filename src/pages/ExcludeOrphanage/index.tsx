import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import excludeOrphanage from '../../assets/exclude-orphanage.svg';
import ActionButton from '../../components/ActionButton';

import '../styles/exclude-orphanage.css';

const ExcludeOrphanage: React.FC = () => {
  const {goBack} = useHistory();
  const [isExcluded, setIsExcluded] = useState(false)

  return (
    <div id="exclude-container">
      <div className="exclude-actions-container">
        <h1>Excluir!</h1>
        <span>Você tem certeza que quer excluir Orf. Esperança?</span>

        <div className="buttons-container">
          {!isExcluded ? (
            <>
              <ActionButton isConfirmation text="Sim" onClick={() => setIsExcluded(true)} />
              <ActionButton text="Não" onClick={goBack} />
            </>
          ) : (
            <ActionButton text="Voltar para o mapa" onClick={goBack} />
          )}
        </div>
      </div>

      <img src={excludeOrphanage} alt="Exclusão de orfanato" />
    </div>
  );
}

export default ExcludeOrphanage;
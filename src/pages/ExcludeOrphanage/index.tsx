import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import excludeOrphanage from '../../assets/exclude-orphanage.svg';
import ActionButton from '../../components/ActionButton';

import api from '../../services/api';
import {IExcludeOrphanageParams} from '../../interfaces';

import '../styles/exclude-orphanage.css';

const ExcludeOrphanage: React.FC = () => {
  const {goBack, location} = useHistory();
  const { id, name } = location.state as IExcludeOrphanageParams;
  const [isExcluded, setIsExcluded] = useState(false)

  const handleDeleteOrphanage = useCallback(async () => {
    try {
      const token = localStorage.getItem('@happy/token');
      await api.delete(`/orphanages/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setIsExcluded(true);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  return (
    <div id="exclude-container">
      <div className="exclude-actions-container">
        {!isExcluded ? (
          <h1>Excluir!</h1>
        ) : (
          <h1>Excluído!</h1>
        )}
        {!isExcluded && (
          <span>Você tem certeza que quer excluir {name}?</span>
        )}

        <div className="buttons-container">
          {!isExcluded ? (
            <>
              <ActionButton isConfirmation text="Sim" onClick={handleDeleteOrphanage} />
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
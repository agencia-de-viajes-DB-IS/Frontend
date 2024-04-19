import { useState } from 'react';
import { url } from '../../helper/server';
import { tpFacility } from '../../types/types';
import axios from 'axios';

interface FacilityFormProps {
  facility: tpFacility
  fetchentity: () => void;
  onClose: () => void;
}

export function FormUpdate({ facility, fetchentity, onClose }: FacilityFormProps) {

  // Datos de la facilidad
  const [name, setName] = useState(facility.name);
  const [description, setDescription] = useState(facility.description);

  console.log(facility)

  // Función para enviar los datos al servidor
  const handleSubmit = () => {

    const id = facility.id
    const token = localStorage.getItem('userToken');

    const data = { id, name, description };

    axios.put(`${url}/facilities`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Solicitud exitosa:', response.data);
        fetchentity();
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
      });

    onClose();
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="" className='fw-bold'>Nombre</label>
        <input
          type="text"
          className="form-control mb-3 border border-secondary w-100"
          placeholder="Ejemplo: Dos habitaciones simples"
          name="name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="" className='fw-bold'>Descripción</label>
        <input
          type="text"
          className="form-control mb-3 border border-secondary w-100"
          placeholder="Ejemplo: Cada habitación con su cama individual, aire acondicionado ..."
          name="description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </div>
      <div className="form-group d-flex flex-column align-items-center">
        <input type="submit" value="Guardar" className="btn btn-dark login_btn" />
      </div>
    </form>
  );
}


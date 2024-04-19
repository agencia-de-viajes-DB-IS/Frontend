import { useState } from 'react';
import axios from 'axios';
import { url } from '../../helper/server';
import { jwtDecode } from 'jwt-decode';
import { tpToken } from '../../types/typesComponents';

interface ExcursionFormProps {
  onClose: () => void;
  fetchExcursions: () => void;
}

function Form({ onClose , fetchExcursions }:ExcursionFormProps) {

  // Definir el estado para cada campo del formulario
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [capacity, setCapacity] = useState<number>();

  const handleSubmit = async () => {

    const token = localStorage.getItem('userToken');

    if (!token) {
      return
    }
    const decodedToken:tpToken = jwtDecode(token);

    const agencyId = decodedToken.agencyId    

    const data = { name, description, location, price, arrivalDate, agencyId, capacity};

    console.log(token);
    
    try {
      const response = await axios.post(`${url}/excursions`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    fetchExcursions();
    onClose();
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <div className="input-group form-group">
        <input
          type="text"
          className="form-control mb-3 border border-secondary"
          placeholder="Nombre"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group form-group">
        <input
          type="text"
          className="form-control mb-3 border border-secondary"
          placeholder="Localización"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="input-group form-group">
        <input
          type="number"
          className="form-control mb-3 border border-secondary"
          placeholder="Precio"
          name="price"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
        />
      </div>
      <div className="input-group form-group">
        <input
          type="number"
          className="form-control mb-3 border border-secondary"
          placeholder="Capacidad"
          name="capacity"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value))}
        />
      </div>
      <div className="input-group form-group">
        <input
          type="datetime-local"
          className="form-control mb-3 border border-secondary"
          placeholder="Fecha de Salida"
          name="arrivalDate"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
        />
      </div>
      <div className="input-group form-group">
        <textarea
          className="form-control mb-3 border border-secondary"
          placeholder="Descripción"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group d-flex flex-column align-items-center">
        <input type="submit" value="Agregar" className="btn btn-dark" />
      </div>
    </form>
  );
}

export default Form;
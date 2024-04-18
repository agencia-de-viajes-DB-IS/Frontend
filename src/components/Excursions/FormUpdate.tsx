import { useState, useEffect } from 'react';
import axios from 'axios';
import { tpExcursion } from '../../types/types';
import { url } from '../../helper/server';
import { tpToken } from '../../types/typesComponents';
import { jwtDecode } from 'jwt-decode';

interface ExcursionFormUpdateProp {
  excursion: tpExcursion;
  fetching: () => void;
  onclose: () => void;
}

export function Form({excursion, fetching, onclose}: ExcursionFormUpdateProp) {

  // Definir el estado para cada campo del formulario
  const [name, setName] = useState(excursion.name);
  const [location, setLocation] = useState(excursion.location);
  const [price, setPrice] = useState<number>(excursion.price);
  const [arrivalDate, setArrivalDate] = useState(excursion.arrivalDate);
  const [description, setDescription] = useState(excursion.description);
  const [capacity, setCapacity] = useState<number>(excursion.capacity);

  const handleSubmit = async () => {
    console.log('voy a editar esta excursion');
    console.log(excursion);

    const token = localStorage.getItem('userToken');
    if (!token) {
      return
    }

    const decodedToken:tpToken = jwtDecode(token)

    const id = excursion.id;
    const agencyId = decodedToken.agencyId;

    const data = { id, name, description, location, price, arrivalDate, capacity};

    console.log(data)

    try {
      const response = await axios.put(`${url}/excursions`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Excursión creada con éxito:', response.data);
    } catch (error) {
      console.error('Error creando la excursión:', error);
    }
    
    fetching();
    onclose();
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
          onChange={(e) => setPrice(parseInt(e.target.value, 10))}
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
          value={new Date(arrivalDate).toISOString().replace('Z', '')}
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
        <input type="submit" value="Editar" className="btn btn-dark" />
      </div>
    </form>
  );
}


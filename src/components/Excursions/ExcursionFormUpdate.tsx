import { useState, useEffect } from 'react';
import axios from 'axios';
import { tpAgency, tpExcursion } from '../../types/types';

interface ExcursionFormUpdateProp {
  excursion: tpExcursion;
}

export function ExcursionForm({excursion}: ExcursionFormUpdateProp) {

  // Definir el estado para cada campo del formulario
  const [name, setName] = useState(excursion.name);
  const [location, setLocation] = useState(excursion.location);
  const [price, setPrice] = useState<number>(excursion.price);
  const [arrivalDate, setArrivalDate] = useState(excursion.arrivalDate);

  // Manejar las agencias
  const [agencies, setAgencies] = useState<tpAgency[]>([]);
  const [selectedAgencyName, setSelectedAgencyName] = useState<string>('');

  useEffect(() => {
    // Recibir las agencias del servidor
    const fetchAgencies = async () => {
        try {
            const response = await axios.get<tpAgency[]>('http://localhost:5000/agencies');            
            setAgencies(response.data);
        } catch (error) {
            console.error('Error fetching agencies:', error);
        }
    };

    fetchAgencies();
}, []);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
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
          type="text"
          className="form-control mb-3 border border-secondary"
          placeholder="Precio"
          name="price"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value, 10))}
        />
      </div>
      <div className="input-group form-group">
        <input
          type="text"
          className="form-control mb-3 border border-secondary"
          placeholder="Fecha de Salida"
          name="arrivalDate"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
        />
      </div>
      <div className="input-group form-group">
        <select
          className="form-control mb-3 border border-secondary custom-select"
          placeholder="Aerolínea"
          name="airline"
          onChange={(e) => setSelectedAgencyName(e.target.value)}
        >
          {agencies.map((agency, index) => (
              <option key={index} value={agency.name}>
                  {agency.name}
              </option>
          ))}
        </select>
      </div>
      <div className="form-group d-flex flex-column align-items-center">
        <input type="submit" value="Agregar" className="btn btn-dark" />
      </div>
    </form>
  );
}


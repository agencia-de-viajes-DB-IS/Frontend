import { useState, useEffect } from 'react';
import axios from 'axios';
import { tpAgency } from '../../types/types';
import { url } from '../../helper/server';

interface ExcursionFormProps {
  onClose: () => void;
  fetchExcursions: () => void;
}

function ExcursionForm({ onClose , fetchExcursions }:ExcursionFormProps) {

  // Definir el estado para cada campo del formulario
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceStr, setPriceStr] = useState('');
  const [description, setDescription] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');

  // Manejar las agencias
  const [agencies, setAgencies] = useState<tpAgency[]>([]);
  const [selectedAgencyName, setSelectedAgencyName] = useState<string>('');

  useEffect(() => {
    // Recibir las agencias del servidor
    const fetchAgencies = async () => {
        try {
            const response = await axios.get<tpAgency[]>('http://localhost:5000/agencies');
            setAgencies([{
              id:"qw",
              name:'Agencias',
              address:"",
              faxNumber:0,
              email:"a@a"
            }, ...response.data]);
        } catch (error) {
            console.error('Error fetching agencies:', error);
        }
    };

    fetchAgencies();
  }, []);

  const handleSubmit = async () => {

    const agencyId = agencies.filter(a => a.name === selectedAgencyName)[0].id;

    console.log('estoy agregando la excursion: ')
    console.log('nombre ', name);
    console.log('localizacion ', location);
    console.log('precio ', priceStr);
    console.log('descripcion ', description);
    console.log('fecha de salida ', arrivalDate);
    console.log('nombre de su agencia ', selectedAgencyName);
    console.log('id de su agencia ', agencyId);
    
    const token = localStorage.getItem('userToken');
    const price = parseInt(priceStr,10);

    const data = { name, description, location, price, arrivalDate, agencyId};

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
          type="text"
          className="form-control mb-3 border border-secondary"
          placeholder="Precio"
          name="priceStr"
          value={priceStr}
          onChange={(e) => setPriceStr(e.target.value)}
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
        <select
          className="form-control mb-3 border border-secondary custom-select"
          placeholder="Agencia"
          name="agency"
          onChange={(e) => setSelectedAgencyName(e.target.value)}
        >
          {agencies.map((agency, index) => (
              <option key={index} value={agency.name}>
                  {agency.name}
              </option>
          ))}
        </select>
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

export default ExcursionForm;
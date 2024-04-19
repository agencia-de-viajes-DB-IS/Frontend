import { useState, useEffect } from 'react';
import axios from 'axios';
import { tpFacility } from '../../types/types';
import { url } from '../../helper/server';
import { MyMultiSelect , MySelect} from '../MyComponents/MultiSelect';

interface FormProps {
  onClose: () => void;
  fetchExcursions: () => void;
}

function Form({ onClose , fetchExcursions }:FormProps) {

  // Definir el estado para cada campo del formulario
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceStr, setPriceStr] = useState('');
  const [description, setDescription] = useState('');
  const [arrivalDate1, setArrivalDate] = useState('');
  const [departureDate1, setDepartureDate] = useState('');
  const [capacity, setCapacity] = useState<number>();

  const [facilities, setFacilities] = useState<tpFacility[]>();
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);


  useEffect(() => {
    
  }, []);



  const handleSubmit = async () => {

    const token = localStorage.getItem('userToken');

    if (!token) {
      return
    }
    const decodedToken: tpToken = jwtDecode(token);

    const agencyId = decodedToken.agencyId

    const data = { name, description, location, price, arrivalDate, departureDate, agencyId, capacity };

    console.log(token);
    
    try {
      const response = await axios.post(`${url}/extended/excursions`, data, {
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
      alert('Hubo un error')
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
      <div className="input-group form-group d-flex flex-column">
      <label htmlFor="">Fecha de Salida</label>
        <input
          type="datetime-local"
          className="form-control mb-3 border border-secondary w-100"
          placeholder="Fecha de Salida"
          name="arrivalDate1"
          value={arrivalDate1}
          onChange={(e) => setArrivalDate(e.target.value)}
        />
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="">Fecha de Llegada</label>
        <input
          type="datetime-local"
          className="form-control mb-3 border border-secondary w-100"
          placeholder="Fecha de Llegada"
          name="departureDate1"
          value={departureDate1}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="">Agencia</label>
        <MySelect options={agencies.map(e => e.name)} setSelectedItem={setSelectedAgencyName}/>
      </div>
      <div className="input-group form-group w-100 d-flex flex-column">
        <label htmlFor="">Ofertas de Hotel</label>
        <MyMultiSelect options={hotelDeals.map(e => e.name)} setSelectedData={(newSelectedHotelDealsNames) => setSelectedHotelDealName(newSelectedHotelDealsNames)}/>
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
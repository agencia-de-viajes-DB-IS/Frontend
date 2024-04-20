import { useState, useEffect } from 'react';
import axios from 'axios';
import { tpFacility } from '../../types/types';
import { url } from '../../helper/server';
import { MyMultiSelect, MySelect } from '../MyComponents/MultiSelect';

interface FormProps {
  onClose: () => void;
  fetchExcursions: () => void;
}

function Form({ onClose, fetchExcursions }: FormProps) {

  // Definir el estado para cada campo del formulario
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [capacity, setCapacity] = useState<number>();

  const [hotelDeals, setHotelDeals] = useState<tpHotelDeals[]>([])
  const [selectedHotelDeals, setSelectedHotelDeals] = useState<string[]>([])

  const [decodedToken, setDecodedToken] = useState<tpToken | null>({
    role: "",
    agencyId: "",
    sub: ""
  })

  const ofertBelongAgent = (ofert: tpHotelDeals) => {

    if (ofert.agencies.filter(e => e.id === decodedToken?.agencyId).length > 0) {
      return true;
    }

    return false;
  }

  const fetchHotelDeals = async () => {
    const hotelDeals = await axios.get<tpHotelDeals[]>(`${url}/hotelDeals`);
    setHotelDeals(hotelDeals.data.filter(e => ofertBelongAgent(e)))
  }

  useEffect(() => {
    fetchHotelDeals();
  }, []);



  const handleSubmit = async () => {

    const token = localStorage.getItem('userToken');

    if (!token) {
      return
    }

    const agencyId = decodedToken.agencyId

    const hotelDealsIDs = hotelDeals
      .filter(e => selectedHotelDeals.includes(e.name))
      .map(e => e.id)

    const data = { name, description, location, price, capacity, arrivalDate, departureDate, hotelDeals, agencyId };

    console.log(token);
    console.log(data);

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
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value,10))}
        />
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="">Fecha de Salida</label>
        <input
          type="datetime-local"
          className="form-control mb-3 border border-secondary w-100"
          placeholder="Fecha de Salida"
          name="arrivalDate"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
        />
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="">Fecha de Llegada</label>
        <input
          type="datetime-local"
          className="form-control mb-3 border border-secondary w-100"
          placeholder="Fecha de Llegada"
          name="departureDate"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </div>
      <div className="input-group form-group w-100 d-flex flex-column">
        <label htmlFor="">Ofertas de Hotel</label>
        <MyMultiSelect options={hotelDeals.map(e => e.name)} setSelectedData={(newSelectedHotelDealsNames) => setSelectedHotelDealName(newSelectedHotelDealsNames)} />
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
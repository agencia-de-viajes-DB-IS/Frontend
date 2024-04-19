import { useState, useEffect } from 'react';
import axios from 'axios';
import { tpAgency, tpHotelDeals, tpHotelDealsShow } from '../../types/types';
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

    const fetchHotelDeals = async () => {
      try {
        const response = await axios.get<tpHotelDeals[]>('http://localhost:5000/hotelDeals');
        setHotelDeals(response.data);
      } catch (error) {
        console.error('Error fetching agencies:', error);
    }
    };

    fetchAgencies();
    fetchHotelDeals();
  }, []);

  const handleSubmit = async () => {

    // Seleccionar el id de la agencia
    const agencyId = agencies.filter(a => a.name === selectedAgencyName)[0].id

    // Seleccionar los id de las ofertas de hotel seleccionadas
    const hotelDealsIDs = selectedHotelDeals
      .map(hotelDeal => hotelDeal.id);
  
    // Tomar el token del usuario
    const token = localStorage.getItem('userToken');

    // Modificar el precio a numero
    const price = parseInt(priceStr,10);

    // Cambiar el formato de la fecha
    const arrivalDate = `${arrivalDate1}:00.00000`
    const departureDate = `${departureDate1}:00.00000`

    const data = { name, description, location, price, arrivalDate, departureDate, hotelDealsIDs, agencyId};

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
import { useState, useEffect } from 'react';
import axios from 'axios';
import { tpAgency, tpExtendedExcursion, tpHotelDeals } from '../../types/types';
import { url } from '../../helper/server';
import { MyMultiSelect, MySelect } from '../MyComponents/MultiSelect';

interface FormUpdateProp {
  excursion: tpExtendedExcursion;
  fetchExtendedExcursions: () => void;
  onClose: () => void;
}

export function Form({excursion , fetchExtendedExcursions , onClose}: FormUpdateProp) {

  // Definir el estado para cada campo del formulario
  const id = excursion.id;
  const [name, setName] = useState(excursion.name);
  const [location, setLocation] = useState(excursion.location);
  const [price, setPrice] = useState<number>(excursion.price);
  const [arrivalDate1, setArrivalDate] = useState(excursion.arrivalDate);
  const [departureDate1, setDepartureDate] = useState(excursion.departureDate);
  const [description, setDescription] = useState(excursion.description);

  // Manejar las agencias
  const [agencies, setAgencies] = useState<tpAgency[]>([]);
  const [selectedAgencyName, setSelectedAgencyName] = useState<string>(excursion.agency.name);

  // Manejar las ofertas de hotel seleccionadas
  const [hotelDeals, setHotelDeals] = useState<tpHotelDeals[]>([]);
  const [selectedHotelDealName, setSelectedHotelDealName] = useState<string[]>([]);



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

        // Llenar selectedHotelDealName con los nombres de las ofertas de hotel cuyos ID coincidan con los de excursion.hotelDealsIDs
        const matchingHotelDealNames = response.data
        .filter(hotelDeal => excursion.hotelDealsIDs.includes(hotelDeal.id))
        .map(hotelDeal => hotelDeal.name);

        setSelectedHotelDealName(matchingHotelDealNames);
      } catch (error) {
        console.error('Error fetching agencies:', error);
    }
    };

    fetchAgencies();
    fetchHotelDeals();
}, []);

  const handleSubmit = async () => {

    const agencyId = agencies.filter(a => a.name === selectedAgencyName)[0].id;

    // Seleccionar los id de las ofertas de hotel seleccionadas
    const hotelDealsIDs = hotelDeals
      .filter(hotelDeal => selectedHotelDealName.includes(hotelDeal.name))
      .map(hotelDeal => hotelDeal.id);

    // Tomar el token del usuario
    const token = localStorage.getItem('userToken');

    // Cambiar el formato de la fecha
    const arrivalDate = `${arrivalDate1}:00.00000`
    const departureDate = `${departureDate1}:00.00000`

    const data = { id, name, description, location, price, arrivalDate, departureDate, hotelDealsIDs, agencyId};

    console.log(token);
    
    try {
      const response = await axios.put(`${url}/extended/excursions`, data, {
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

    
    fetchExtendedExcursions();
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
          name="price"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value, 10))}
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
        <MyMultiSelect options={hotelDeals.map(e => e.name)} setSelectedData={(newSelectedHotelDealsNames) => setSelectedHotelDealName(newSelectedHotelDealsNames)} selectedIds={selectedHotelDealName}/>
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


import { useState, useEffect } from 'react';
import axios from 'axios';
import { tpAgency, tpHotel, tpHotelDeals } from '../../types/types';

interface HotelDealFormUpdateProp {
  hotelDeal: tpHotelDeals;
}

export function HotelDealForm({hotelDeal}: HotelDealFormUpdateProp) {

  // Definir el estado para cada campo del formulario
  const [name, setName] = useState<string>('Nombre de la Oferta de Hotel');
  const [price, setPrice] = useState<number>(hotelDeal.price);
  const [arrivalDate, setArrivalDate] = useState<string>(hotelDeal.arrivalDate);
  const [departureDate, setDepartureDate] = useState<string>(hotelDeal.departureDate);
  const [description, setDescription] = useState<string>(hotelDeal.description);

  // Manejar las agencias
  const [agencies, setAgencies] = useState<tpAgency[]>([]);
  const [selectedAgencyName, setSelectedAgencyName] = useState<string>('');

  // Manejar los hoteles
  const [hotels, setHotels] = useState<tpHotel[]>([]);
  const [selectedHotelName, setSelectedHotelName] = useState<string>('');

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

    // Recibir los hoteles del servidor
    const fetchHotels = async () => {
      try {
          const response = await axios.get<tpHotel[]>('http://localhost:5000/hotels');
          setHotels(response.data);
      } catch (error) {
          console.error('Error fetching hotelDeals:', error);
      }
  };

    fetchAgencies();
    fetchHotels();
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
        <input
          type="text"
          className="form-control mb-3 border border-secondary"
          placeholder="Fecha de Llegada"
          name="departureDate"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </div>
      <div className="input-group form-group">
        <select
          className="form-control mb-3 border border-secondary custom-select"
          placeholder="Hotel"
          name="hotel"
          onChange={(e) => setSelectedHotelName(e.target.value)}
        >
          {hotels.map((hotel, index) => (
              <option key={index} value={hotel.name}>
                  {hotel.name}
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


import { useState, useEffect } from 'react';
import axios from 'axios';
import { tpHotels, tpHotelDeals } from '../../types/types';

interface HotelDealFormUpdateProp {
  hotelDeal: tpHotelDeals;
  onClose: () => void;
  fetchentities: () => void;
}

export function HotelDealForm({hotelDeal, onClose, fetchentities}: HotelDealFormUpdateProp) {

  // Definir el estado para cada campo del formulario
  const [name, setName] = useState<string>(hotelDeal.name);
  const [price, setPrice] = useState<number>(hotelDeal.price);
  const [arrivalDate, setArrivalDate] = useState<string>(hotelDeal.arrivalDate);
  const [departureDate, setDepartureDate] = useState<string>(hotelDeal.departureDate);
  const [description, setDescription] = useState<string>(hotelDeal.description);
  const [capacity, setCapacity] = useState<number>(hotelDeal.capacity)

  // Manejar los hoteles
  const [hotels, setHotels] = useState<tpHotels[]>([]);
  const [selectedHotelName, setSelectedHotelName] = useState<string>();

  useEffect(() => {

    // Recibir los hoteles del servidor
    const fetchHotels = async () => {
        try {
            const response = await axios.get<tpHotels[]>('http://localhost:5000/hotels');
            setHotels([{
              id:"qw",
              name:'Hoteles',
              address:"",
              category:0,
              description:''
            }, ...response.data]);

            setSelectedHotelName(response.data.find(e => e.id === hotelDeal.hotelId)?.name)
        } catch (error) {
            console.error('Error fetching hotelDeals:', error);
        }
    };

    fetchHotels();
}, []);

  console.log(hotelDeal);
  

  const handleSubmit = () => {
    
    
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
          onChange={(e) => setCapacity(parseInt(e.target.value, 10))}
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
          placeholder="Hoteles"
          name="hotel"
          value={selectedHotelName}
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
        <input type="submit" value="Editar" className="btn btn-dark" />
      </div>
    </form>
  );
}


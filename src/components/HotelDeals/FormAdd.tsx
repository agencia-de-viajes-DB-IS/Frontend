import { useState, useEffect } from 'react';
import axios from 'axios';
import { tpHotels } from '../../types/types';
import { ModalShowProps, tpToken } from '../../types/typesComponents';
import { url } from '../../helper/server';
import { jwtDecode } from 'jwt-decode';


function HotelDealForm({ onClose }:ModalShowProps) {

    // Definir el estado para cada campo del formulario
    const [name, setName] = useState<string>('');
    const [priceStr, setPriceStr] = useState<string>('');
    const [arrivalDate, setArrivalDate] = useState<string>('');
    const [departureDate, setDepartureDate] = useState<string>('');
    const [description, setDescription] = useState<string>('')

    // Manejar los hoteles
    const [hotels, setHotels] = useState<tpHotel[]>([]);
    const [selectedHotelName, setSelectedHotelName] = useState<string>('');

    useEffect(() => {

        // Recibir los hoteles del servidor
        const fetchHotels = async () => {
            try {
                const response = await axios.get<tpHotels[]>('http://localhost:5000/hotels');
                setHotels([{
                  id:"qw",
                  name:'Hoteles',
                  address:"",
                  category:0
                }, ...response.data]);
            } catch (error) {
                console.error('Error fetching hotelDeals:', error);
            }
        };

        fetchHotels();
    }, []);

    const token = localStorage.getItem('userToken');


    const handleSubmit = async () => {
      
      console.log('voy a agregar una oferta de hotel')
      console.log('nombre', name);
      console.log('priceStr', priceStr);
      console.log('fecha de salida', arrivalDate);
      console.log('fecha de llegada', departureDate);
      console.log('hotel', selectedHotelName);

      const price = parseInt(priceStr,10);

      if (!token) {
        console.log('no token') 
        return
      }

      console.log(hotels)

      const decodeToken:tpToken = jwtDecode(token)
      const agencyId = decodeToken.agencyId

      const data = { name, price, arrivalDate, departureDate, agencyId}; // falta el id de hotel y saber el request body
      console.log(token);
      console.log(data)
      try {
        const response = await axios.post(`${url}/hotelDeals`, data, {
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

      // hay que mandar a updetear las ofertas de hotel
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
            placeholder="Precio"
            name="priceStr"
            value={priceStr}
            onChange={(e) => setPriceStr(e.target.value)}
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

export default HotelDealForm;
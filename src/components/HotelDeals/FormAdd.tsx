import { useState, useEffect } from 'react';
import axios from 'axios';
import { tpAgency, tpHotel, tpHotelDeals } from '../../types/types';
import { ModalShowProps } from '../../types/typesComponents';
import { url } from '../../helper/server';


function HotelDealForm({ onClose }:ModalShowProps) {

    // Definir el estado para cada campo del formulario
    const [name, setName] = useState<string>('');
    const [priceStr, setPriceStr] = useState<string>('');
    const [arrivalDate, setArrivalDate] = useState<string>('');
    const [departureDate, setDepartureDate] = useState<string>('');
    const [description, setDescription] = useState<string>('')

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

        // Recibir los hoteles del servidor
        const fetchHotels = async () => {
            try {
                const response = await axios.get<tpHotel[]>('http://localhost:5000/hotels');
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

        fetchAgencies();
        fetchHotels();
    }, []);

    const token = localStorage.getItem('userToken');

    const handleSubmit = async () => {
      
      console.log('voy a agregar una oferta de hotel')
      console.log('nombre', name);
      console.log('priceStr', priceStr);
      console.log('fecha de salida', arrivalDate);
      console.log('fecha de llegada', departureDate);
      console.log('agencia', selectedAgencyName);
      console.log('hotel', selectedHotelName);

      const price = parseInt(priceStr,10);

      const agencyId = agencies.filter(a => a.name === selectedAgencyName)[0].id;

      const data = { name, price, arrivalDate, departureDate,  agencyId}; // falta el id de hotel y saber el request body
      console.log(token);
      
      try {
        const response = await axios.post(`${url}/agencies`, data, {
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

export default HotelDealForm;
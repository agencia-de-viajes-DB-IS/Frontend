import { useState, useEffect } from 'react';
import axios from 'axios';
import { tpHotels } from '../../types/types';
import { FormProps, tpToken } from '../../types/typesComponents';
import { url } from '../../helper/server';


function HotelDealForm({ onClose, fetchentity }:FormProps) {

    // Definir el estado para cada campo del formulario
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>();
    const [arrivalDate, setArrivalDate] = useState<string>('');
    const [departureDate, setDepartureDate] = useState<string>('');
    const [description, setDescription] = useState<string>('')
    const [capacity, setCapacity] = useState<number>()

    // Manejar los hoteles
    const [hotels, setHotels] = useState<tpHotels[]>([]);
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
                  category:0,
                  description:''
                }, ...response.data]);
            } catch (error) {
                console.error('Error fetching hotelDeals:', error);
            }
        };

        fetchHotels();
    }, []);

    const token = localStorage.getItem('userToken');

    // Función para obtener el ID del hotel basado en el nombre seleccionado
    const getHotelIdByName = (hotelName: string): string | undefined => {
      const hotel = hotels.find(h => h.name === hotelName);
      return hotel ? hotel.id : undefined;
    };

    const handleSubmit = () => {
      console.log('voy a agregar una oferta de hotel');
      console.log('nombre', name);
      console.log('price', price);
      console.log('fecha de salida', arrivalDate);
      console.log('fecha de llegada', departureDate);
      console.log('hotel', selectedHotelName);
  
      const hotelId = getHotelIdByName(selectedHotelName);
  
      const data = {
          name,
          price,
          arrivalDate,
          departureDate,
          hotelId,
          capacity,
          description
      };

      console.log(data)
  
      axios.post(`${url}/hotelDeals`, data, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
      })
      .then(response => {
          console.log(response);
          // Aquí puedes hacer lo que necesites con la respuesta, por ejemplo, actualizar el estado de tu aplicación
          fetchentity();
      })
      .catch(error => {
          console.error('Error:', error);
          // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      });
  
      // No es necesario llamar a fetchentity aquí si ya lo haces dentro del .then()
      // fetchentity();
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
            onChange={(e) => setPrice(parseInt(e.target.value,10))}
          />
        </div>
        <div className="input-group form-group">
          <input
            type="number"
            className="form-control mb-3 border border-secondary"
            placeholder="Capacidad"
            name="capacity"
            value={capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value,10))}
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
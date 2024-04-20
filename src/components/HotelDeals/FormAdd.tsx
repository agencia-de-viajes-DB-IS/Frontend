import { useState, useEffect } from 'react';
import axios from 'axios';
import { tpHotels } from '../../types/types';
import { FormProps, tpToken } from '../../types/typesComponents';
import { url } from '../../helper/server';
import { MySelect } from '../MyComponents/MultiSelect';


function HotelDealForm({ onClose, fetchentity }: FormProps) {

  // Definir el estado para cada campo del formulario
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [arrivalDate, setArrivalDate] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [description, setDescription] = useState<string>('')
  const [capacity, setCapacity] = useState<number>(0)

  // Manejar los hoteles
  const [hotels, setHotels] = useState<tpHotels[]>([]);
  const [selectedHotelName, setSelectedHotelName] = useState<string>('');

  useEffect(() => {

    // Recibir los hoteles del servidor
    const fetchHotels = async () => {
      try {
        const response = await axios.get<tpHotels[]>('http://localhost:5000/hotels');
        setHotels(response.data);
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
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="">Nombre</label>
        <input
          type="text"
          className="form-control mb-3 w-100 border border-secondary"
          placeholder="Ejemplo: Habitación simple"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="">Precio</label>
        <input
          type="number"
          className="form-control mb-3 border w-100 border-secondary"
          placeholder="Precio"
          name="price"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value, 10))}
        />
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="">Capacidad</label>
        <input
          type="number"
          className="form-control mb-3 border w-100 border-secondary"
          placeholder="Ejemplo: 10"
          name="capacity"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value, 10))}
        />
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="">Fecha de Salida</label>
        <input
          type="datetime-local"
          className="form-control mb-3 w-100 border border-secondary"
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
          className="form-control mb-3 border w-100 border-secondary"
          placeholder=""
          name="departureDate"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="">Hotel</label>
        <MySelect options={hotels.map(e => e.name)} setSelectedItem={setSelectedHotelName} defaultValue={selectedHotelName}/>
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="">Descripción</label>
        <textarea
          className="form-control w-100 mb-3 border border-secondary"
          placeholder="Ejemplo: La habitación consta de una cama individual, un ..."
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
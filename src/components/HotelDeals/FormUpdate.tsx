import { useState, useEffect } from 'react';
import axios from 'axios';
import { tpHotels, tpHotelDeals } from '../../types/types';
import { MySelect } from '../MyComponents/MultiSelect';

interface HotelDealFormUpdateProp {
  hotelDeal: tpHotelDeals;
  onClose: () => void;
  fetchentities: () => void;
}

export function HotelDealForm({ hotelDeal, onClose, fetchentities }: HotelDealFormUpdateProp) {

  // Definir el estado para cada campo del formulario
  const [name, setName] = useState<string>(hotelDeal.name);
  const [price, setPrice] = useState<number>(hotelDeal.price);
  const [arrivalDate, setArrivalDate] = useState<string>(hotelDeal.arrivalDate);
  const [departureDate, setDepartureDate] = useState<string>(hotelDeal.departureDate);
  const [description, setDescription] = useState<string>(hotelDeal.description);
  const [capacity, setCapacity] = useState<number>(hotelDeal.capacity)

  // Manejar los hoteles
  const [hotels, setHotels] = useState<tpHotels[]>([]);
  const [selectedHotelName, setSelectedHotelName] = useState<string>('');

  useEffect(() => {

    // Recibir los hoteles del servidor
    const fetchHotels = async () => {
      try {
        const response = await axios.get<tpHotels[]>('http://localhost:5000/hotels');
        setHotels(response.data);

        setSelectedHotelName(response.data.find(e => e.id === hotelDeal.hotelId)?.name)
      } catch (error) {
        console.error('Error fetching hotelDeals:', error);
      }
    };

    fetchHotels();
  }, []);


  // Función para obtener el ID del hotel basado en el nombre seleccionado
  const getHotelIdByName = (hotelName: string): string | undefined => {
    const hotel = hotels.find(h => h.name === hotelName);
    return hotel ? hotel.id : undefined;
  };

  const handleSubmit = () => {

    const hotelId = getHotelIdByName(selectedHotelName);

    const id = hotelDeal.id

    const token = localStorage.getItem('userToken')
    console.log(token)
    axios.put(`http://localhost:5000/hotelDeals`, {
      id,
      name,
      price,
      arrivalDate,
      departureDate,
      description,
      capacity,
      hotelId
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('HotelDeal actualizado con éxito:', response.data);
        // Aquí puedes manejar la respuesta del servidor, por ejemplo, actualizando el estado o mostrando un mensaje de éxito
        fetchentities();
      })
      .catch(error => {
        console.error('Error actualizando el hotelDeal:', error);
        // Manejar el error, por ejemplo, mostrando un mensaje de error al usuario
      });

    onClose();
  }

  console.log(selectedHotelName)

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
        <input type="submit" value="Editar" className="btn btn-dark" />
      </div>
    </form>
  );
}


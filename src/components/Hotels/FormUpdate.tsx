import { useState } from 'react';
import axios from 'axios';
import { tpHotelDeals, tpHotels } from '../../types/types';
import { url } from '../../helper/server';

interface HotelFormUpdateProp {
  hotel: tpHotels;
  onClose: () => void;
  fetchentity: () => void;
}

export function HotelForm({hotel, onClose, fetchentity}: HotelFormUpdateProp) {

  // Definir el estado para cada campo del formulario
  const [name, setName] = useState<string>(hotel.name);
  const [address, setAddress] = useState<string>(hotel.address);
  const [category, setCategory] = useState<number>(hotel.category);
  const [description, setDescription] = useState<string>(hotel.description);

  const token = localStorage.getItem('userToken')

  const handleSubmit = async () => {
    
    const id = hotel.id;
   
    const deals: tpHotelDeals[] = [];
    const data = { id, name, address, category, description, deals };
   
    try {
       const response = await axios.put(`${url}/hotels`, data, {
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
   
    fetchentity();
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
            placeholder="Dirección"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="input-group form-group">
          <input
            type="number"
            className="form-control mb-3 border border-secondary"
            placeholder="Categoría"
            name="category"
            value={category}
            onChange={(e) => setCategory(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="input-group form-group">
          <input
            type="text"
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


import { useState } from 'react';
import axios from 'axios';
import { FormProps, ModalShowProps } from '../../types/typesComponents';
import { url } from '../../helper/server';
import { tpHotelDeals } from '../../types/types';



function HotelForm({ onClose, fetchentity}:FormProps) {

    // Definir el estado para cada campo del formulario
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [category, setCategory] = useState<number>(0);
    const [description, setDescription] = useState<string>('');


    const token = localStorage.getItem('userToken');

    const handleSubmit = async () => {

      const deals:tpHotelDeals[] = []
      const data = { name, address, category, description, deals};
      console.log(token);
      
      try {
        const response = await axios.post(`${url}/hotels`, data, {
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
          <input type="submit" value="Agregar" className="btn btn-dark" />
        </div>
      </form>
    );
}

export default HotelForm;
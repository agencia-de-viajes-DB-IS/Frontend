import { useState } from 'react';
import { url } from '../../helper/server';
import axios from 'axios';
import { FormProps } from '../../types/typesComponents';


function FormAdd({ onClose, fetchentity }: FormProps) {

  // Datos de la facilidad
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  // Función para enviar los datos al servidor
  const handleSubmit = () => {

    const token = localStorage.getItem('userToken');

    const data = { name, description };

    axios.post(`${url}/facilities`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Solicitud exitosa:', response.data);
        // Aquí puedes hacer lo que necesites con la respuesta
        fetchentity();
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
      });

    onClose();
  }


  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="" className='fw-bold'>Nombre</label>
        <input
          type="text"
          className="form-control mb-3 border border-secondary w-100"
          placeholder="Ejemplo: Dos habitaciones simples"
          name="name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="" className='fw-bold'>Descripción</label>
        <input
          type="text"
          className="form-control mb-3 border border-secondary w-100"
          placeholder="Ejemplo: Cada habitación con su cama individual, aire acondicionado ..."
          name="description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </div>
      <div className="form-group d-flex flex-column align-items-center">
        <input type="submit" value="Guardar" className="btn btn-dark login_btn" />
      </div>
    </form>
  );
}

export default FormAdd;
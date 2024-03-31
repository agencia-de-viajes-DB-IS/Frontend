import { useState } from 'react';
import { url } from '../../helper/server';
import axios from 'axios';

interface FormAddProps {
  onClose: () => void; // Esta función se utilizará para cerrar el modal
  fetchAgencies: () => void;
}

function AgencyForm({ onClose, fetchAgencies }:FormAddProps) {
 // Definir el estado para cada campo del formulario
 const [name, setName] = useState('');
 const [address, setAddress] = useState('');
 const [faxNumberStr, setFaxNumber] = useState('');
 const [email, setEmail] = useState('');

 const token = localStorage.getItem('userToken');

 // Función para enviar los datos al servidor
  const sendDataToServer = async () => {
    
    const faxNumber = parseInt(faxNumberStr,10);

    const data = { name, address, faxNumber, email };
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

    fetchAgencies();
    onClose();
  };

 return (
    <form onSubmit={(e) => {
      e.preventDefault();
      sendDataToServer();
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
              type="text" 
              className="form-control mb-3 border border-secondary" 
              placeholder="Número de Fax"
              name="faxNumberStr"
              value={faxNumberStr}
              onChange={(e) => setFaxNumber(e.target.value)}
          /> 
      </div>
      <div className="input-group form-group">
          <input
              type="text" 
              className="form-control mb-3 border border-secondary" 
              placeholder="Email"
              name="email"
              value={email}
              onChange={({target}) => setEmail(target.value)}
          /> 
      </div>
      <div className="form-group d-flex flex-column align-items-center">
          <input type="submit" value="Agregar" className="btn btn-dark"/>
      </div>
    </form>
 );
}

export default AgencyForm;
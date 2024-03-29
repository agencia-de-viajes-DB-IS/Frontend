import { useState } from 'react';
import { url } from '../../helper/server';

function AgencyForm() {
 // Definir el estado para cada campo del formulario
 const [name, setName] = useState('');
 const [address, setAddress] = useState('');
 const [faxNumber, setFaxNumber] = useState('');
 const [email, setEmail] = useState('');

 // Función para enviar los datos al servidor
 const sendDataToServer = async () => {
    const data = { name, address, faxNumber, email };
    try {
      const response = await fetch(`${url}/agencies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }
      console.log('Datos enviados con éxito');
    } catch (error) {
      console.error('Error:', error);
    }
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
              name="faxNumber"
              value={faxNumber}
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
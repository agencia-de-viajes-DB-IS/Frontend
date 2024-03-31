import { useState } from 'react';
import { url } from '../../helper/server';
import { tpAgency } from '../../types/types';

interface AgencyFormProps {
  agency: tpAgency;
}

const AgencyFormUpdate: React.FC<AgencyFormProps> = ({ agency }) => {
  const [name, setName] = useState(agency.name);
  const [address, setAddress] = useState(agency.address);
  const [faxNumberStr, setFaxNumberStr] = useState(agency.faxNumber.toString());
  const [email, setEmail] = useState(agency.email);
  const id = agency.id;
  
 // Función para enviar los datos al servidor
 const sendDataToServer = async () => {

    const faxNumber = parseInt(faxNumberStr, 10);

    // Obtén el token de autenticación del almacenamiento local
    const token = localStorage.getItem('userToken');

    const data = { name, address, faxNumber, email, id };

    try {console.log(data)
      const response = await fetch(`${url}/agencies`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
              name="faxNumberStr"
              value={faxNumberStr}
              onChange={(e) => setFaxNumberStr(e.target.value)}
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
          <input type="submit" value="Editar" className="btn btn-dark"/>
      </div>
    </form>
 );
}

export default AgencyFormUpdate;

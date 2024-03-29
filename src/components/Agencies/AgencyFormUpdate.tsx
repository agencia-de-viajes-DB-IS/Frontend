import { useState } from 'react';
import { url } from '../../helper/server';
import { AgencyGet } from '../../types/types';

interface AgencyFormProps {
  agency: AgencyGet;
 }
const AgencyFormUpdate: React.FC<AgencyFormProps> = ({ agency }) => {
  const [name, setName] = useState(agency.name);
  const [address, setAddress] = useState(agency.address);
  const [faxNumber, setFaxNumber] = useState(agency.faxNumber);
  const [email, setEmail] = useState(agency.email);
  const [id, setId] = useState(agency.$id);
  
 // Función para enviar los datos al servidor
 const sendDataToServer = async () => {
    const data = { name, address, faxNumber, email, id };
    try {console.log(data)
      const response = await fetch(`${url}/agencies`, {
        method: 'PUT',
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
      <label>
        Nombre:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Dirección:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <label>
        Número de fax:
        <input type="number" value={faxNumber} onChange={(e) => setFaxNumber(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button type="submit">Enviar</button>
    </form>
 );
}

export default AgencyFormUpdate;

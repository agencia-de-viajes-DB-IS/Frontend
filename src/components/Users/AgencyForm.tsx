import { useState } from 'react';
import { url } from '../../helper/server';

function AgencyForm() {
 // Definir el estado para cada campo del formulario
 const [name, setName] = useState('');
 const [address, setAddress] = useState('');
 const [email, setEmail] = useState('');

 // Función para enviar los datos al servidor
 const sendDataToServer = async () => {
    const data = { firstName: name, lastName: address, email };
    try {
      const response = await fetch(`${url}/users`, {
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
      <label>
        Primer Nombre:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Segundo nombre:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button type="submit">Enviar</button>
    </form>
 );
}

export default AgencyForm;
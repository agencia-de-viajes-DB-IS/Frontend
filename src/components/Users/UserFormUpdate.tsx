import { useState } from 'react';
import { url } from '../../helper/server';
import { tpUser } from '../../types/types';

interface UserFormProps {
  user: tpUser;
  fetchUsers: () => void;
  onClose: () => void;
 }
export function UserForm({ user, fetchUsers, onClose }: UserFormProps) {

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const id = user.id;

  console.log(user)
  
 // Función para enviar los datos al servidor
 const sendDataToServer = async () => {
    const data = { userId:id, firstName:firstName, lastName:lastName, email:email };
    try {console.log(data)
      const response = await fetch(`${url}/users`, {
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

    fetchUsers();
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
              name="firstName"
              value={firstName}
              onChange={({target}) => setFirstName(target.value)}
          /> 
      </div>
      <div className="input-group form-group">
          <input
              type="text" 
              className="form-control mb-3 border border-secondary" 
              placeholder="Apellidos"
              name="lastName"
              value={lastName}
              onChange={({target}) => setLastName(target.value)}
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
          <input type="submit" value="Editar" className="btn btn-dark login_btn"/>
      </div>
    </form>
 );
}


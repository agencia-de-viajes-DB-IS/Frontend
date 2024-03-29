import { useState } from 'react';
import { url } from '../../helper/server';

function UserForm() {
 
  // Datos del registro del usuario
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const rols = ['Rol', 'Agente de Marketing', 'Administrador']

 // Función para enviar los datos al servidor
 const sendDataToServer = async () => {
    const data = { firstName:firstName, lastName:lastName, email:email, password:password };
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
      <div className="input-group form-group">
          <select
            className="form-control mb-3 border border-secondary custom-select"
            placeholder="Rol"
            name="rol"
        >
            {rols.map((rol, index) => (
                <option key={index} value={rol}>
                    {rol}
                </option>
            ))}
        </select>
        </div>
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
      <div className="input-group form-group">
          <input 
              type="text" 
              className="form-control mb-3 border border-secondary" 
              placeholder="Password"
              name="password"
              value={password}
              onChange={({target}) => setPassword(target.value)}
          />
      </div>
      <div className="form-group d-flex flex-column align-items-center">
          <input type="submit" value="Registrar" className="btn btn-dark login_btn"/>
      </div>
    </form>
 );
}

export default UserForm;
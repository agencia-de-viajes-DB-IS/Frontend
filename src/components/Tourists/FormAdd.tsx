import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FormProps } from '../../types/typesComponents';
import { url } from '../../helper/server';

export function Form({ onClose, fetchentity }: FormProps) {

  // Datos del registro del turista
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nacionality, setNacionality] = useState("");
  const [Ci, setCi] = useState("");

  // Decodificar el token para obtener el ID del usuario
  const token = localStorage.getItem('userToken');
  if (!token) {
    console.error('No se encontró el token en el localStorage');
    return;
  }

  const decodedToken = jwtDecode(token);
  const userId = decodedToken.sub;


  const createTourists = () => {
    // Configuración de la solicitud

    const data = {
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      nationality: nacionality,
      ci: Ci,
    };

    console.log('añadiendo un turista');
    console.log(token);
    console.log(data);

    // Make the POST request with Axios
    axios.post(`http://localhost:5000/tourists`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => {
        console.log('Solicitud exitosa:', response.data);
        // Aquí puedes hacer lo que necesites con la respuesta, por ejemplo, actualizar el estado de tu aplicación
        fetchentity();
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      });

      onClose();
  }

  const handleSubmit = () => {
    createTourists();
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
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="input-group form-group">
        <input
          type="text"
          className="form-control mb-3 border border-secondary"
          placeholder="Apellidos"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="input-group form-group">
        <input
          type="text"
          className="form-control mb-3 border border-secondary"
          placeholder="Nacionalidad"
          name="nacionality"
          value={nacionality}
          onChange={(e) => setNacionality(e.target.value)}
        />
      </div>
      <div className="input-group form-group">
        <input
          type="text"
          className="form-control mb-3 border border-secondary"
          placeholder="Carnet de Identidad"
          name="Ci"
          value={Ci}
          onChange={(e) => setCi(e.target.value)}
        />
      </div>
      <div className="form-group d-flex flex-column align-items-center">
        <input type="submit" value="Guardar" className="btn btn-dark" />
      </div>
    </form>
  );
}

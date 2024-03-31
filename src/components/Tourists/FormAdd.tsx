import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface FormAddProps {
  onClose: () => void; // Esta función se utilizará para cerrar el modal
}

export function Form({ onClose }:FormAddProps) {

    // Datos del registro del turista
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nacionality, setNacionality] = useState("");
    const [id, setId] = useState("");

    // Decodificar el token para obtener el ID del usuario
    const token = localStorage.getItem('userToken');
    if (!token) {
      console.error('No se encontró el token en el localStorage');
      return;
    }
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub;

    // Función para hacer la solicitud POST
    const createTurista = async () => {

      // Crear el objeto turista
      const turista = {
        firstName: firstName,
        lastName: lastName,
        nacionality: nacionality,
        id: id,
      };

      try {
        // Configuración de la solicitud
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          data: {
            ...turista // Enviar datos del turista
          },
        };

        // Realizar la solicitud POST
        const response = await axios.post('http://localhost:5000/tourists', config);

        // Manejar la respuesta
        console.log(response.data);
        // Aquí puedes hacer lo que necesites con la respuesta, como mostrar un mensaje de éxito
      } catch (error) {
        console.error('Error al crear el turista:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error
      }
    };

    const getTourists = async () => {
      // Assuming you have the token and the ID of the newly created tourist
      const token = localStorage.getItem('userToken'); // Retrieve the token from localStorage
      const newTouristId = id; // Replace this with the actual ID of the newly created tourist
     
      // Construct the config object
      const config = {
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
         },
         data: {
           userId: userId, // Assuming userId is available in the scope
           touristId: newTouristId, // Include the ID of the newly created tourist
         },
      };
     
      try {
         // Make the POST request
         const response = await axios.post('http://localhost:5000/users/tourists', config);
     
         // Handle the response
         console.log(response.data);
         // You can process the response data as needed
      } catch (error) {
         console.error('Error fetching tourists:', error);
         // Handle the error as needed
      }
     };

    const handleSubmit = () => {
      createTurista();
      getTourists();
      
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
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="form-group d-flex flex-column align-items-center">
        <input type="submit" value="Guardar" className="btn btn-dark" />
      </div>
    </form>
  );
}

import { useEffect, useState } from 'react';
import { url } from '../../helper/server';
import { tpAgency } from '../../types/types';
import axios from 'axios';
import { MySelect } from '../MyComponents/MultiSelect';
import { tpRol } from '../../types/typesComponents';

interface UserFormProps {
  fetchUsers: () => void;
  onClose: () => void;
}


function UserForm({onClose, fetchUsers}:UserFormProps) {
 
    // Datos del registro del usuario
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Manejar las agencias
    const [agencies, setAgencies] = useState<tpAgency[]>([]);
    const [selectedAgencyName, setSelectedAgencyName] = useState<string>('');

    // Manejar los Roles
    const [roles, setRoles] = useState<tpRol[]>([])

    const rols = ['Agente de Marketing', 'Administrador']
    const [selectedRol, setSelectedRol] = useState<string>('');

    // Función para buscar el ID de la agencia por su nombre
    const findAgencyIdByName = (name: string): string | null => {
      const agency = agencies.find(agency => agency.name === name);
      return agency ? agency.id : null;
    };

    // Función para buscar el ID de la agencia por su nombre
    const findRolIdByName = (name: string): string | null => {
      const rol = roles.find(rol => rol.name === name);
      return rol ? rol.id : null;
    };

    // Obtener los roles y saber el id del rol seleccionado
    const fetchRoles = async() => {
      const token = localStorage.getItem('userToken')

      axios.get('http://localhost:5000/roles', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then(response => {
          // Suponiendo que la respuesta es un array de roles
          setRoles(response.data);
        })
        .catch(error => {
        console.error('Error al realizar la solicitud:', error);
      });

    }

    // Función para enviar los datos al servidor
    const sendDataToServer = () => {

      

      const token = localStorage.getItem('userToken');

      if (selectedRol === 'Agente de Marketing') {
        const rolId = findRolIdByName('Marketing Agent');

        // Uso de la función para obtener el ID de la agencia seleccionada
        const agencyId = findAgencyIdByName(selectedAgencyName);

        const data = { firstName:firstName, lastName:lastName, email:email, roleId:rolId, password:password, agencyId:agencyId};
        console.log(data)
        axios.post(`${url}/backOffice/users`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          console.log('Solicitud exitosa:', response.data);
          // Aquí puedes hacer lo que necesites con la respuesta
          fetchUsers();
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
        });
      }
      else if (selectedRol === 'Administrador') {
        const rolId = findRolIdByName('Super Admin');
        
        // Uso de la función para obtener el ID de la agencia seleccionada
        const agencyId = agencies[0].id;

        const data = { firstName:firstName, lastName:lastName, email:email, roleId:rolId, password:password, agencyId:agencyId};

        axios.post(`${url}/backOffice/users`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          console.log('Solicitud exitosa:', response.data);
          // Aquí puedes hacer lo que necesites con la respuesta
          fetchUsers();
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
        });
      }
      onClose();
    }

    useEffect(() => {
      // Recibir las agencias del servidor
      const fetchAgencies = async () => {
          try {
              const response = await axios.get<tpAgency[]>('http://localhost:5000/agencies');            
              setAgencies(response.data);
          } catch (error) {
              console.error('Error fetching agencies:', error);
          }
      };

    fetchAgencies();
    fetchRoles()
    }, []);

 return (
    <form onSubmit={(e) => {
      e.preventDefault();
      sendDataToServer();
    }}>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="" className='fw-bold'>Nombre</label>
          <input
              type="text" 
              className="form-control mb-3 border border-secondary w-100" 
              placeholder="Ejemplo: Miguel"
              name="firstName"
              value={firstName}
              onChange={({target}) => setFirstName(target.value)}
          /> 
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="" className='fw-bold'>Apellidos</label>
        <input
            type="text" 
            className="form-control mb-3 border border-secondary w-100" 
            placeholder="Ejemplo: Pérez Rodríguez"
            name="lastName"
            value={lastName}
            onChange={({target}) => setLastName(target.value)}
        /> 
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="" className='fw-bold'>Rol</label>
        <MySelect options={rols} setSelectedItem={setSelectedRol}/>
      </div>
      {selectedRol === 'Agente de Marketing' &&
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="">Agencia</label>
        <MySelect options={agencies.map(e => e.name)} setSelectedItem={setSelectedAgencyName}/>
      </div>
      }
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="" className='fw-bold'>Correo Electrónico</label>
        <input
            type="text" 
            className="form-control mb-3 border border-secondary w-100" 
            placeholder="Ejemplo: fulanito@gmail.com"
            name="email"
            value={email}
            onChange={({target}) => setEmail(target.value)}
        /> 
      </div>
      <div className="input-group form-group d-flex flex-column">
        <label htmlFor="" className='fw-bold'>Contraseña</label>
          <input 
              type="text" 
              className="form-control mb-3 border border-secondary w-100" 
              placeholder="Ejemplo: miPassword2000!"
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
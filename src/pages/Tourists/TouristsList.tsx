import { useState, useEffect } from "react";
import './styles.css'
import { DarkPicture } from "../../components/DarkPicture/Dark";
import { Header } from "../../components/Header/Header";
import axios from "axios";
import { tpTourist } from "../../types/types";
import { jwtDecode } from 'jwt-decode';
import { ModalAdd } from "../../components/Tourists/ModalAdd";

export function TouristsList() {

    const [userId, setUserId] = useState(''); // id del usuario
    const [tourists, setTourists] = useState<tpTourist[]>([]); // turistas del usuario

    // Función para obtener los turistas del usuario
    const fetchTourists = async () => {
        try {
        // Obtener el token del localStorage
        const token = localStorage.getItem('token');
    
        // Configuración de la solicitud
        const config = {
            headers: {
            'Authorization': `Bearer ${token}` // Asegúrate de que este es el formato correcto para tu token
            },
            data: {
                userId:userId
            }
        };
    
        // Realizar la solicitud GET
        const response = await axios.get<tpTourist[]>('http://localhost:5000/users/tourists', config);
    
        // Manejar la respuesta
        setTourists(response.data);
        console.log(tourists);
    
        // Aquí puedes hacer lo que necesites con los datos de los turistas
        } catch (error) {
        console.error('Error al obtener los datos de los turistas:', error);
        }
   };

    // Función para decodificar el token y ontener el id del usuario
    const decodeToken = () => {
        try {
            // Obtener el token del localStorage
            const token = localStorage.getItem('userToken');

            if (!token) {
              console.error('No se encontró el token en el localStorage');
              return;
            }

            // Decodificar el token
            const decodedToken = jwtDecode(token);
            console.log(decodedToken.sub);

            setUserId(decodeToken.sub)
            // Aquí puedes hacer lo que necesites con la información decodificada del token
        } catch (error) {
            console.error('Error al decodificar el token:', error);
        }
    };

    useEffect(() => {
        // Llamar a la función para decodificar el token
        decodeToken();

        // Llamar a la funcion para obtener los turistas
        fetchTourists();
    },[]);
    

    return (
        <>
            <div className="agencies-main">
                <DarkPicture/>
                <Header/>
                
                <h1 id="agency-title">Mis Turistas</h1>
            </div>

            <div className="container mt-5">
                <ModalAdd/>
                <ul className="list-group mt-3">
                    {tourists && tourists.map((tourist, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{tourist.firstname}</h5>
                                <small>{tourist.lastname}</small>
                            </div>
                            <div>
                                {/* <UserModalUpdate tourist={tourist}/> */}
                                <button type="button" className="btn btn-danger">Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

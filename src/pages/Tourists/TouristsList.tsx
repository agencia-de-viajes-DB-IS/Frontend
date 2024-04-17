import { useState, useEffect } from "react";
import './styles.css'
import { DarkPicture } from "../../components/DarkPicture/Dark";
import { Header } from "../../components/Header/Header";
import axios from "axios";
import { tpTourist } from "../../types/types";
import { jwtDecode } from 'jwt-decode';
import { ModalAdd } from "../../components/Tourists/ModalAdd";
import { ModalUpdate } from "../../components/Tourists/ModalUpdate";
import { url } from "../../helper/server";
import { tpToken } from "../../types/typesComponents";

export function TouristsList() {

    const [tourists, setTourists] = useState<tpTourist[]>([]); // turistas del usuario


const fetchTourists = async () => {
    try {
        // Obtener el token del localStorage
        const token = localStorage.getItem('userToken');
        if (!token) {
            console.log('no token');
            return; // Asegúrate de manejar este caso adecuadamente
        }

        // Decodificar el token para obtener el userId
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;

        // Configuración de la solicitud
        const config = {
            method: 'get',
            url: `${url}/users/tourists`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        // Realizar la solicitud GET con Axios
        const response = await axios(config);

        console.log(response.data);
        // Aquí puedes manejar la respuesta exitosa, por ejemplo, actualizando el estado de tu aplicación
    } catch (error) {
        console.error('Error al obtener los datos de los turistas:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
};

    useEffect(() => {

        // Llamar a la funcion para obtener los turistas
        fetchTourists();
    },[]);


    const handleDeleteTourist = (touristId:string) => {

        const token = localStorage.getItem('userToken');

        axios.delete(`${url}/tourists/`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }, data: {
                touristId
            }
         })
         .then(response => {
            console.log('Solicitud exitosa:', response.data);
            // Aquí puedes hacer lo que necesites con la respuesta, por ejemplo, actualizar el estado de tu aplicación
         })
         .catch(error => {
            console.error('Error al realizar la solicitud:', error);
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
        });

        fetchTourists();
    }
    

    return (
        <>
            <div className="agencies-main">
                <DarkPicture/>
                <Header/>
                
                <h1 id="agency-title">Mis Turistas</h1>
            </div>

            <div className="container mt-5">
                <ModalAdd fetchentity={fetchTourists}/>
                <ul className="list-group mt-3">
                    {tourists.map((tourist, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{tourist.firstName}</h5>
                                <small>{tourist.lastName}</small>
                            </div>
                            <div>
                                <ModalUpdate tourist={tourist} fetchentity={fetchTourists}/>
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteTourist(tourist.touristID)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

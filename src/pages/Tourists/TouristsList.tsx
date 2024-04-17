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

    const token = localStorage.getItem('userToken')

    const fetchTourists = async () => {
        await axios.get(`${url}/users/tourists`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setTourists(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los datos de los turistas:', error);
        });
    };

    useEffect(() => {
        // Llamar a la funcion para obtener los turistas
        fetchTourists();
    },[]);


    const handleDeleteTourist = (touristId:string) => {

        const token = localStorage.getItem('userToken');

        axios.delete(`${url}/tourists`, {
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
            fetchTourists();
         })
         .catch(error => {
            console.error('Error al realizar la solicitud:', error);
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
        });
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

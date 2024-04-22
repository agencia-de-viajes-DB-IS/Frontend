import { useEffect, useState } from "react";
import './styles.css'
import { tpToken } from "../../types/typesComponents";
import { jwtDecode } from "jwt-decode";
import { tpReservationExcursions } from "../../types/types";
import axios from "axios";
import { url } from "../../helper/server";
import { Reservations } from "../../components/Reservations/Reservations";

export function ReservationsExcursions() {

    const [reservations, setReservations] = useState<tpReservationExcursions[]>([]);
    
    const token = localStorage.getItem('userToken');
    if (!token) {
        return;
    }
    
    const decodedToken:tpToken = jwtDecode(token)
    
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const fetchReservation = async () => {
        const response = await axios.get<tpReservationExcursions[]>(`${url}/reservation/excursion?userIdFilter=${decodedToken?.sub}`, config);
        setReservations(response.data)
        console.log(response.data)
    }

    useEffect(() => {

        console.log(token);
        
        fetchReservation();
    }, []);

    const handleDelete = async (id:string) => {
        const data = {
            id
        }

        try {
            await axios.delete(`${url}/reservation/excursion`, {...config, data})
            fetchReservation();
        } catch (error) {
            console.error("Error al eliminar la reservacion:", error);
        }
    }

    return (
        <>
            {decodedToken &&
                <Reservations>
                    <div className="container mt-5">
                        <div className="d-flex justify-content-around align-items-center mb-3">
                            <h1>Excursiones reservadas</h1>
                        </div>
                        <ul className="list-group mt-3 ms-5 me-5">
                            {reservations.map((item, index) => (
                                <li key={index} className="list-group-item d-flex align-items-center justify-content-center">
                                    <div className="d-flex align-items-center justify-content-between w-100">
                                        <div className="">
                                            <h5 className="mb-2">{item.excursion.name}</h5>
                                            <ul>
                                            {item.tourists.map((tourist) => (
                                                <li className="list-group-element mb-2">{tourist.ci + ' : ' + tourist.firstName + ' ' + tourist.lastName}</li>
                                            ))}
                                            </ul>
                                            
                                        </div>
                                        <div>
                                            <small className="me-3"><strong>Precio:</strong> {' ' + item.price}</small>
                                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(item.id)}>Eliminar</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reservations>
            }
        </>
    )
}
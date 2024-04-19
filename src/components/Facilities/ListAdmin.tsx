import { tpFacility} from '../../types/types'
import ModalAdd from './ModalAdd'
import ModalUpdate from './ModalUdpate'
import './styles.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { url } from '../../helper/server'

export function Facilities() {

    const [facilities, setFacilities] = useState<tpFacility[]>([]);

    const token = localStorage.getItem('userToken');
    console.log(token);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const fetchFacilities = async () => {
        const response = await axios.get<tpFacility[]>(`${url}/facilities`, config);
        setFacilities(response.data)
    }

    const handleDelete = async (id: number) => {

        const data = {
            id
        }

        try {
            await axios.delete(`${url}/facilities`, {...config, data})

            fetchFacilities();
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
        }
    }

    useEffect(() => {
        fetchFacilities();
    }, []);
    
    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <h1>Facilidades</h1>
                </div>
                <ModalAdd fetchentity={fetchFacilities}/>
                <ul className="list-group mt-3">
                    {facilities.map((facility, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{facility.name}</h5>
                                <small>{facility.description}</small>
                            </div>
                            <div>
                                <ModalUpdate facility={facility} fetchentity={fetchFacilities}/>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(facility.id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
import { useEffect, useState } from 'react';
import './styles.css'
import { tpExcursionGet } from '../../types/types';
import axios from 'axios';
import { url } from '../../helper/server';
import { ModalAdd } from './ModalAdd';
import { ModalUpdate} from './ModalUpdate';
import { tpToken } from '../../types/typesComponents';
import { jwtDecode } from 'jwt-decode';

export const Excursions = () => {
    
    const [excursions, setExcursions] = useState<tpExcursionGet[]>([])

    const token = localStorage.getItem('userToken');
    if (!token) {
        return
    }

    const decodedToken:tpToken = jwtDecode(token)

    const handleDeleteExcursion = async (id: string) => {
        try {

            // Configuración de la solicitud
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Incluir el token en el header de Authorization
                },
                data: {
                    id: id
                }
            };

            const response = await axios.delete(`${url}/excursions`, config);

            if (response.status === 200) {
                // Actualiza el estado para reflejar la eliminación de la excursion
                console.log('Excursion eliminada con éxito');

            }else {
                console.error('Error al eliminar la excursion');
            }
        } catch (error) {
            console.error('Error al eliminar la excursion:', error);
        }

        fetchExcursions();
    };

    const fetchExcursions = async () => {
        const response = await axios.get<tpExcursionGet[]>(`${url}/excursions`);
        const excursionsagency = response.data.filter(e => e.agency.id === decodedToken.agencyId)
        setExcursions(excursionsagency)
    }

    useEffect(() => {
        fetchExcursions();
    }, []);
    
    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <h1>Administrar Excursiones</h1>
                </div>
                <ModalAdd fetchExcursions={fetchExcursions}/>
                <ul className="list-group mt-3">
                    {excursions.map((excursion, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{excursion.name}</h5>
                                <small>{excursion.location}</small>
                            </div>
                            <div>
                                <ModalUpdate excursion={excursion} fetching={fetchExcursions}/>
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteExcursion(excursion.id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

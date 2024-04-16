import { useEffect, useState } from 'react';
import './styles.css'
import { tpExtendedExcursion } from '../../types/types';
import axios from 'axios';
import { url } from '../../helper/server';
import { ModalAdd } from './ModalAdd';
import { ModalUpdate} from './ModalUpdate';

export const ExtendedExcursions = () => {
    
    const [extendedExcursions, setExtendedExcursions] = useState<tpExtendedExcursion[]>([])

    const handleDeleteExtendedExcursion = async (id: string) => {
        try {

            // Obtener el token del localStorage
            const token = localStorage.getItem('userToken');

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

            const response = await axios.delete(`${url}/extended/excursions`, config);

            if (response.status === 200) {
                // Actualiza el estado para reflejar la eliminación de la excursion
                console.log('Excursion extendida eliminada con éxito');

            }else {
                console.error('Error al eliminar la excursion');
            }
        } catch (error) {
            console.error('Error al eliminar la excursion:', error);
        }

        fetchExtendedExcursions();
    };

    const fetchExtendedExcursions = async () => {
        const response = await axios.get<tpExtendedExcursion[]>(`${url}/extended/excursions`);
        setExtendedExcursions(response.data)
    }

    useEffect(() => {
        fetchExtendedExcursions();
    }, []);
    
    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <h1>Administrar Excursiones Extendidas</h1>
                </div>
                <ModalAdd fetchExcursions={fetchExtendedExcursions}/>
                <ul className="list-group mt-3">
                    {extendedExcursions.map((excursion, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{excursion.name}</h5>
                                <small>{excursion.location}</small>
                            </div>
                            <div>
                                <ModalUpdate excursion={excursion} fetchExcursions={fetchExtendedExcursions}/>
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteExtendedExcursion(excursion.id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
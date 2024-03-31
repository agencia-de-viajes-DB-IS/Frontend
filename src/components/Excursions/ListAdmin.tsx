import { useEffect, useState } from 'react';
import './styles.css'
import { tpExcursion } from '../../types/types';
import axios from 'axios';
import { url } from '../../helper/server';
import { ExcursionModal } from './ModalAdd';
import { ExcursionModalUpdate} from './ModalUpdate';

export const Excursions = () => {
    
    const [excursions, setExcursions] = useState<tpExcursion[]>([])

    const deleteExcursion = async (id: string) => {
        try {
            const response = await axios.delete(`${url}/agencies/${id}`);

            if (response.status === 200) {

                // Actualiza el estado para reflejar la eliminación de la excursion
                setExcursions(excursions.filter(excursion => excursion.id !== id));
                console.log('Excursion eliminada con éxito');

            }else {
                console.error('Error al eliminar la excursion');
            }
        } catch (error) {
            console.error('Error al eliminar la excursion:', error);
        }
    };    

    const handleDeleteExcursion = (excursion:tpExcursion) => {
        deleteExcursion(excursion.id)
    }

    const fetchExcursions = async () => {
        const response = await axios.get<tpExcursion[]>(`${url}/excursions`);
        setExcursions(response.data)
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
                <ExcursionModal fetchExcursions={fetchExcursions}/>
                <ul className="list-group mt-3">
                    {excursions.map((excursion, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{excursion.name}</h5>
                                <small>{excursion.location}</small>
                            </div>
                            <div>
                                <ExcursionModalUpdate excursion={excursion}/>
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteExcursion(excursion)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

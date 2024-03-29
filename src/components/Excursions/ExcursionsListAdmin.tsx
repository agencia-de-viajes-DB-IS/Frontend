import { useEffect, useState } from 'react';
import { AgenciesProps } from '../../types/typesComponents'
import './styles.css'
import { tpExcursion } from '../../types/types';
import axios from 'axios';
import { url } from '../../helper/server';
import ExcursionModal from './ExcursionModalAdd';
import { Modal } from 'react-bootstrap';
// import ExcursionModalUpdate from './ExcursionModalUpdate';

export const Excursions: React.FC<AgenciesProps> = ({data}) => {
    
    const [excursions, setExcursions] = useState<tpExcursion[]>([])

    // // Funcion para eliminar una agencia especifica
    // const del = async (id: number) => {
    //     const data = { id: `${id}`};
    //     console.log(data)
    //     try {
    //     const response = await fetch(`${url}/agencies`, {
    //         method: 'DELETE',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     });
    //     if (!response.ok) {
    //         throw new Error('Error al enviar los datos');
    //     }
    //     setAgencies(agencies.filter(agency => agency.id !== id));
    //     console.log('Datos enviados con éxito');
    //     } catch (error) {
    //     console.error('Error:', error);
    //     }
    // };

    const deleteExcursion = async (id: number) => {
        // try {
        //     const response = await axios.delete(`${url}/agencies/${id}`);
        //     // if (response.status === 200) {
        //     if(true)
        //         // Actualiza el estado para reflejar la eliminación de la agencia
        //         setAgencies(agencies.filter(agency => agency.id !== id));
        //         console.log('Agencia eliminada con éxito');
        //     // }else {
        //     //     console.error('Error al eliminar la agencia');
        //     // }
        // } catch (error) {
        //     console.error('Error al eliminar la agencia:', error);
        // }
    };    

    useEffect(() => {
        const api = async () => {
            const response = await axios.get<tpExcursion[]>(`${url}/excursions`);
            setExcursions(response.data.$values)
        }
        api();
    }, []);
    
    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <h1>Agencias</h1>
                </div>
                <ExcursionModal/>
                <ul className="list-group mt-3">
                    {excursions.map((excursion, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{excursion.location}</h5>
                                <small>{excursion.arrivalDate}</small>
                            </div>
                            <div>
                                {/* <ExcursionModalUpdate excursionency={excursion}/> */}
                                <button type="button" className="btn btn-danger">Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

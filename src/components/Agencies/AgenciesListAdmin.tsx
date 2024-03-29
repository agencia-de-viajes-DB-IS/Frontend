import { useEffect, useState } from 'react';
import { AgenciesProps } from '../../types/typesComponents'
import './styles.css'
import { tpAgency } from '../../types/types';
import axios from 'axios';
import { url } from '../../helper/server';
import AgencyModal from './AgencyModalAdd';
import { Modal } from 'react-bootstrap';
import AgencyModalUpdate from './AgencyModalUpdate';

export const Agencies: React.FC<AgenciesProps> = ({data}) => {
    
    const [agencies, setAgencies] = useState<tpAgency[]>([])
    const [update, setUpdate] = useState<tpAgency>()

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

    const deleteAgency = async (id: number) => {
        try {
            const response = await axios.delete(`${url}/agencies/${id}`);
            // if (response.status === 200) {
            if(true)
                // Actualiza el estado para reflejar la eliminación de la agencia
                setAgencies(agencies.filter(agency => agency.id !== id));
                console.log('Agencia eliminada con éxito');
            // }else {
            //     console.error('Error al eliminar la agencia');
            // }
        } catch (error) {
            console.error('Error al eliminar la agencia:', error);
        }
    };    

    useEffect(() => {
        const api = async () => {
            const agencies = await axios.get<tpAgency[]>(`${url}/agencies`);
            setAgencies(agencies.data)
        }
        api();
    }, []);
    
    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <h1>Agencias</h1>
                </div>
                <AgencyModal/>
                <ul className="list-group mt-3">
                    {agencies.map((ag, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{ag.name}</h5>
                                <small>{ag.email}</small>
                            </div>
                            <div>
                                <AgencyModalUpdate agency={ag}/>
                                <button type="button" className="btn btn-danger">Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

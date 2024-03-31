import { useEffect, useState } from 'react';
import './styles.css'
import { tpAgency } from '../../types/types';
import axios from 'axios';
import { url } from '../../helper/server';
import AgencyModal from './ModalAdd';
import AgencyModalUpdate from './ModalUpdate';

export const Agencies = () => {
    
    const [agencies, setAgencies] = useState<tpAgency[]>([])

    const deleteAgency = async (id: string) => {
        try {
            const response = await axios.delete(`${url}/agencies`, {
                data:{
                    id: id
                }
            });
            if (response.status === 200) {
                // Actualiza el estado para reflejar la eliminación de la agencia
                setAgencies(agencies.filter(agency => agency.id !== id));
                console.log('Agencia eliminada con éxito');
            }else {
                console.error('Error al eliminar la agencia');
            }
        } catch (error) {
            console.error('Error al eliminar la agencia:', error);
        }
    };

    const handleDeleteAgency = (agency:tpAgency) => {
        console.log('voy a borrar la agencia: ')
        console.log(agency)
        deleteAgency(agency.id);
    }

    const fetchAgencies = async () => {
        const agencies = await axios.get<tpAgency[]>(`${url}/agencies`);
        setAgencies(agencies.data)
    }

    useEffect(() => {
        fetchAgencies();
    }, []);

    
    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <h1>Administrar Agencias</h1>
                </div>
                <AgencyModal fetchAgencies={fetchAgencies}/>
                <ul className="list-group mt-3">
                    {agencies.map((ag, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{ag.name}</h5>
                                <small>{ag.address}</small>
                            </div>
                            <div>
                                <AgencyModalUpdate agency={ag}/>
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteAgency(ag)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

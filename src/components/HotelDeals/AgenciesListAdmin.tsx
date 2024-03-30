import { useEffect, useState } from 'react';
import './styles.css'
import { tpHotelDeals } from '../../types/types';
import axios from 'axios';
import { url } from '../../helper/server';
import HotelDealsModal from './HotelDealsModalAdd';
import HotelDealsModalUpdate from './HotelDealsModalUpdate';

export const HotelDeals = () => {
    
    const [hotelDeals, setHotelDeals] = useState<tpHotelDeals[]>([])

    const deleteHotelDeals = async (id: string) => {
        try {
            const response = await axios.delete(`${url}/hotelDeals`, {
                data:{
                    id: id
                }
            });
            if (response.status === 200) {
                // Actualiza el estado para reflejar la eliminación de la agencia
                setHotelDeals(hotelDeals.filter(agency => agency.id !== id));
                console.log('Oferta de Hotel eliminada con éxito');
            }else {
                console.error('Error al eliminar la agencia');
            }
        } catch (error) {
            console.error('Error al eliminar la agencia:', error);
        }
    };

    const handleDeleteHotelDeals = (agency:tpHotelDeals) => {
        console.log('voy a borrar la agencia: ')
        console.log(agency)
        deleteHotelDeals(agency.id);
    }

    useEffect(() => {
        const api = async () => {
            const hotelDeals = await axios.get<tpHotelDeals[]>(`${url}/hotelDeals`);
            setHotelDeals(hotelDeals.data)
        }
        api();
    }, []);
    
    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <h1>Agencias</h1>
                </div>
                <HotelDealsModal/>
                <ul className="list-group mt-3">
                    {agencies.map((ag, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{ag.name}</h5>
                                <small>{ag.email}</small>
                            </div>
                            <div>
                                <HotelDealsModalUpdate agency={ag}/>
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteAgency(ag)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

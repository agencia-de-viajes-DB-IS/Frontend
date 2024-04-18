import { useEffect, useState } from 'react';
import './styles.css'
import { tpHotelDeals } from '../../types/types';
import axios from 'axios';
import { url } from '../../helper/server';
import { HotelDealModal } from './ModalAdd';
import { HotelDealModalUpdate } from './ModalUpdate';

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
                setHotelDeals(hotelDeals.filter(hotelDeal => hotelDeal.id !== id));
                console.log('Oferta de Hotel eliminada con éxito');
            }else {
                console.error('Error al eliminar la agencia');
            }
        } catch (error) {
            console.error('Error al eliminar la agencia:', error);
        }
    };

    const handleDeleteHotelDeal = (hotelDeal:tpHotelDeals) => {
        console.log('voy a borrar la oferta de hotel: ')
        console.log(hotelDeal)
        deleteHotelDeals(hotelDeal.id);
    }

    const fetchHotelDeals = async () => {
        const hotelDeals = await axios.get<tpHotelDeals[]>(`${url}/hotelDeals`);
        setHotelDeals(hotelDeals.data)
    }

    useEffect(() => {
        
        fetchHotelDeals();
    }, []);
    
    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <h1>Administrar Ofertas de Hotel</h1>
                </div>
                <HotelDealModal fetchentity={fetchHotelDeals}/>
                <ul className="list-group mt-3">
                    {hotelDeals.map((ofert, index) => (
                        <li key={index} className="list-group-item list-group-element">
                            <div>
                                <h5 className="mb-1">{ofert.name}</h5>
                                <small>{ofert.description}</small>
                            </div>
                            <div>
                                <HotelDealModalUpdate hotelDeal={ofert} fetchentities={fetchHotelDeals}/>
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteHotelDeal(ofert)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

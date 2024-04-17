import { useEffect, useState } from 'react';
import './styles.css'
import { tpHotels } from '../../types/types';
import axios from 'axios';
import { url } from '../../helper/server';
import { HotelModal } from './ModalAdd';
import { HotelModalUpdate } from './ModalUpdate';

export const Hotels = () => {
    
    const [hotels, setHotels] = useState<tpHotels[]>([])

    const deleteHotels = async (id: string) => {
        try {
            const response = await axios.delete(`${url}/hotels`, {
                data:{
                    id: id
                }
            });
            if (response.status === 200) {
                console.log('Hotel eliminado con éxito');
            }
        } catch (error) {
            console.error('Error al eliminar el hotel:', error);
        }
    };

    const handleDeleteHotel = (hotel:tpHotels) => {
        
        deleteHotels(hotel.id);
        fetchhotels();
    }

    const fetchhotels = async () => {
        const hotels = await axios.get<tpHotels[]>(`${url}/hotels`);
        setHotels(hotels.data)
    }

    useEffect(() => {
        
        fetchhotels();
    }, []);
    
    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <h1>Administrar Hoteles</h1>
                </div>
                <HotelModal fetchentity={fetchhotels}/>
                <ul className="list-group mt-3">
                    {hotels.map((hotel, index) => (
                        <li key={index} className="list-group-item list-group-element">
                            <div>
                                <h5 className="mb-1">{hotel.name}</h5>
                                <small>{hotel.address}</small>
                            </div>
                            <div>
                                <HotelModalUpdate hotel={hotel} fetchentity={fetchhotels}/>
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteHotel(hotel)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

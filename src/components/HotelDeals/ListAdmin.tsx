import { useEffect, useState } from 'react';
import './styles.css'
import { tpHotelDeals } from '../../types/types';
import axios from 'axios';
import { url } from '../../helper/server';
import { HotelDealModal } from './ModalAdd';
import { HotelDealModalUpdate } from './ModalUpdate';
import { tpToken } from '../../types/typesComponents';
import { jwtDecode } from 'jwt-decode';

export function HotelDeals() {

    const [hotelDeals, setHotelDeals] = useState<tpHotelDeals[]>([])

    const [decodedToken, setDecodedToken] = useState<tpToken | null>({
        role: "",
        agencyId: "",
        sub: ""
    })

    const deleteHotelDeals = async (id: string) => {
        try {
            const token = localStorage.getItem('userToken');

            const response = await axios.delete(`${url}/hotelDeals`, {
                data: {
                    id: id
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
            );
            if (response.status === 200) {
                // Actualiza el estado para reflejar la eliminación de la agencia
                setHotelDeals(hotelDeals.filter(hotelDeal => hotelDeal.id !== id));
                console.log('Oferta de Hotel eliminada con éxito');
            } else {
                console.error('Error al eliminar la agencia');
            }
        } catch (error) {
            console.error('Error al eliminar la agencia:', error);
        }
    };

    const handleDeleteHotelDeal = (hotelDeal: tpHotelDeals) => {
        console.log('voy a borrar la oferta de hotel: ')
        console.log(hotelDeal)
        deleteHotelDeals(hotelDeal.id);
    }

    const fetchHotelDeals = async () => {
        const hotelDeals = await axios.get<tpHotelDeals[]>(`${url}/hotelDeals`);
        console.log(hotelDeals)
        setHotelDeals(hotelDeals.data)
    }

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setDecodedToken(jwtDecode(token))
        }

        fetchHotelDeals();
    }, []);

    const ofertBelongAgent = (ofert: tpHotelDeals) => {

        if (ofert.agencies.filter(e => e.id === decodedToken?.agencyId).length > 0) {
            return true;
        }

        return false;
    }


    const takeHotelDeal = (ofert: tpHotelDeals) => {

        const token = localStorage.getItem('userToken');
        const data = {
            hotelDealId: ofert.id
        }

        console.log(data)
        console.log(token)
        axios.post(`${url}/agencies/hoteldeal`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                console.log(response);
                fetchHotelDeals();
            })
            .catch(error => {
                console.error('Error:', error);
                // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
            });
    }

    const letHotelDeal = (ofert: tpHotelDeals) => {

        const token = localStorage.getItem('userToken');

        axios.delete(`${url}/agencies/hoteldeal`, {
            data: {
                hotelDealId: ofert.id
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                console.log(response);
                fetchHotelDeals();
            })
            .catch(error => {
                console.error('Error:', error);
                // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
            });
    }

    console.log(decodedToken?.agencyId)

    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <h1>Administrar Ofertas de Hotel</h1>
                </div>
                {decodedToken?.role === 'Super Admin' && <HotelDealModal fetchentity={fetchHotelDeals} />}
                <ul className="list-group mt-3">
                    {hotelDeals.map((ofert, index) => (
                        <li key={index} className="list-group-item list-group-element">
                            <div>
                                <h5 className="mb-1">{ofert.name}</h5>
                                <small>{ofert.description}</small>
                            </div>
                            <div>
                                {decodedToken?.role === 'Super Admin' && <HotelDealModalUpdate hotelDeal={ofert} fetchentities={fetchHotelDeals} />}
                                {decodedToken?.role === 'Super Admin' && <button type="button" className="btn btn-danger" onClick={() => handleDeleteHotelDeal(ofert)}>Eliminar</button>}

                                {decodedToken?.role === 'Marketing Agent' && ofertBelongAgent(ofert) &&
                                    <button type="button" className="btn btn-danger" onClick={() => letHotelDeal(ofert)}>Eliminar</button>
                                }
                                {decodedToken?.role === 'Marketing Agent' && !ofertBelongAgent(ofert) &&
                                    <button type="button" className="btn btn-success" onClick={() => takeHotelDeal(ofert)}>Agregar</button>
                                }
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

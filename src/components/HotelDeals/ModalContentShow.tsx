import img from '../../images/hotel.jpg'
import './styles.css'
import { tpHotelDeals, tpHotels } from '../../types/types';
import { useEffect, useState } from 'react';
import axios from 'axios';

function HotelDealModalContent(hotelDeal:tpHotelDeals) {

    
    // Arreglar la fecha de llegada
    const fechaString = hotelDeal.departureDate;
    const fecha = new Date(fechaString);
    const opcionesFecha: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const opcionesHora: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit'};
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
    const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);
    
    // Arreglar la fecha de salida
    const fechaString1 = hotelDeal.arrivalDate;
    const fecha1 = new Date(fechaString1);
    const opcionesFecha1: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const opcionesHora1: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit'};
    const fechaFormateada1 = fecha1.toLocaleDateString('es-ES', opcionesFecha1);
    const horaFormateada1 = fecha1.toLocaleTimeString('es-ES', opcionesHora1);
    
    // Manejar el hotel
    const [hotels, setHotels] = useState<tpHotels[]>([]);
    const [selectedHotelName, setSelectedHotelName] = useState<string>('');


    useEffect(() => {

        // Recibir los hoteles del servidor
        const fetchHotels = async () => {
            try {
                const response = await axios.get<tpHotels[]>('http://localhost:5000/hotels');
                setHotels(response.data);
                setSelectedHotelName(response.data.find(e => e.id == hotelDeal.hotelId).name)
            } catch (error) {
                console.error('Error fetching hotelDeals:', error);
            }
        };

        fetchHotels();
    }, []);

    return (
        <>
            <div className='hotelDeal-info-containier'>
                <div className='img-hotelDeal'>
                    <img src={img} alt="" className='img-fluid'/>
                </div>
                <div className='hotelDeal-info'>
                    <div className='hotelDeal-item'>
                        <span>Hotel</span>
                        <p>{selectedHotelName}</p>  
                    </div>
                    <div className='hotelDeal-item'>
                        <span>Precio</span>
                        <p>{hotelDeal.price}</p>  
                    </div>
                    <div className='hotelDeal-item'>
                        <span>Fecha de Salida</span>
                        <p>
                            <p className='mb-0'>{fechaFormateada1}</p>
                            <p>{horaFormateada1}</p>
                        </p> 
                    </div>
                    <div className='hotelDeal-item'>
                        <span>Fecha de Llegada</span>
                        <p>
                            <p className='mb-0'>{fechaFormateada}</p>
                            <p>{horaFormateada}</p>
                        </p> 
                    </div>
                </div>  
                <div className='hotelDeal-item'>
                    <span>Descripción</span>
                    <p>{hotelDeal.description}</p>  
                </div>
            </div>
        </>
    );
}

export default HotelDealModalContent;
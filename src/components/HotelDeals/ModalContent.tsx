import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/hotel.jpg'
import './styles.css'
import { tpHotelDeals } from '../../types/types';
import AgencyModal from '../Agencies/AgencyModal';

function HotelDealModalContent(hotelDeal:tpHotelDeals) {

    return (
        <>
            <div className='hotelDeal-info-containier'>
                <div className='img-hotelDeal'>
                    <img src={img} alt="" className='img-fluid'/>
                </div>
                <div className='hotelDeal-info'>
                    <div className='hotelDeal-item'>
                        <span>Hotel</span>
                        <p>Nombre del Hotel</p>  
                    </div>
                    <div className='hotelDeal-item'>
                        <span>Precio</span>
                        <p>{hotelDeal.price}</p>  
                    </div>
                    <div className='hotelDeal-item'>
                        <span>Fecha de Salida</span>
                        <p>{hotelDeal.arrivalDate}</p>  
                    </div>
                    <div className='hotelDeal-item'>
                        <span>Fecha de Llegada</span>
                        <p>{hotelDeal.departureDate}</p>  
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
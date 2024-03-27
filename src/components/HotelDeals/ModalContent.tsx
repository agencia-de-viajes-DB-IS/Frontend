import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/anders.jpg'
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
                    <div className='hotelDeal-agency'>
                        <span>Agencia</span>
                        <p>{hotelDeal.arrivalDate}</p>  
                    </div>
                </div>   
            </div>
        </>
    );
}

export default HotelDealModalContent;
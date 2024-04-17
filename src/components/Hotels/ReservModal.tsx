import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/roca.jpg'
import './styles.css'
import { tpHotelDeals } from '../../types/types';
import { MDBModalContent } from 'mdb-react-ui-kit';
import HotelDealReservModalContent from './ReservModalContent';

interface HotelDealModalProp {
    hotelDeal:tpHotelDeals,
    show:boolean,
    handleClose:() => void
}

function HotelDealReservModal({ hotelDeal, show, handleClose }:HotelDealModalProp) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Reservar Oferta de Hotel {hotelDeal.arrivalDate}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <HotelDealReservModalContent {...hotelDeal}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default HotelDealReservModal;
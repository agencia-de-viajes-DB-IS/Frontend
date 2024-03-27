import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/anders.jpg'
import './styles.css'
import { tpHotelDeals } from '../../types/types';
import { MDBModalContent } from 'mdb-react-ui-kit';
import HotelDealModalContent from './ModalContent';

interface HotelDealModalProp {
    hotelDeal:tpHotelDeals,
    show:boolean,
    handleClose:() => void
}

function HotelDealModal({ hotelDeal, show, handleClose }:HotelDealModalProp) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {hotelDeal.arrivalDate}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <HotelDealModalContent {...hotelDeal}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default HotelDealModal;
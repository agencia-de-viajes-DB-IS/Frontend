import Modal from 'react-bootstrap/Modal';
import './styles.css'
import { tpHotelDeals } from '../../types/types';
import HotelDealModalContent from './ModalContentShow';

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
                        {hotelDeal.name}
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
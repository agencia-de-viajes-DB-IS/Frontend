import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/hotel.jpg'
import './styles.css'
import { tpHotelDeals } from '../../types/types';
import { MDBModalContent } from 'mdb-react-ui-kit';
import ModalContent from './ModalContent';
import HotelDealModalContent from './ModalContent';
import HotelDealModal from './HotelDealModal';

function HotelDealCard(hotelDeal:tpHotelDeals) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="card-client" onClick={handleShow}>
                <div className="user-picture">
                    <img src={img} alt="foto"/>
                </div>
                <p className="title-item">{hotelDeal.arrivalDate}</p>
            </div>
            
            <HotelDealModal hotelDeal={hotelDeal} show={show} handleClose={handleClose}/>
        </>
    );
}

export default HotelDealCard;
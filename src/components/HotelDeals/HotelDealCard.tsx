import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/hotel.jpg'
import './styles.css'
import { tpHotelDeals } from '../../types/types';
import { MDBModalContent } from 'mdb-react-ui-kit';
import ModalContent from './ModalContent';
import HotelDealModalContent from './ModalContent';
import HotelDealModal from './HotelDealModal';
import HotelDealReservModal from './ReservModal';

function HotelDealCard(hotelDeal:tpHotelDeals) {
    
    // Para manejar el Modal de informacion
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Para manejar el Modal de la reservacion
    const [showR, setShowR] = useState(false);
    const handleCloseR = () => setShowR(false);
    const handleShowR = () => setShowR(true);

    const usuarioLogeado = true;

    const handleReserv = () => {
        handleShowR();
    }

    return (
        <>
            <div className="card-client">
                <div className="user-picture">
                    <img src={img} alt="foto"/>
                </div>
                <p className="title-item">{hotelDeal.arrivalDate}</p>
                <div className='d-flex justify-content-around'>
                    {usuarioLogeado &&
                    <div className='btn-card'>
                        <button type="button" className='btn-reserv' onClick={handleReserv}>Reservar</button>
                    </div>
                    }
                    <div className='btn-card'>
                        <button type="button" className='btn btn-secondary' onClick={handleShow}>Info</button>
                    </div>
                </div>
                
            </div>

            <HotelDealReservModal hotelDeal={hotelDeal} show={showR} handleClose={handleCloseR}/>
            
            <HotelDealModal hotelDeal={hotelDeal} show={show} handleClose={handleClose}/>
        </>
    );
}

export default HotelDealCard;
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/anders.jpg'
import './styles.css'
import { tpExcursion } from '../../types/types';
import { MDBModalContent } from 'mdb-react-ui-kit';
import ModalContent from './ModalContentShow';
import AgencyModalContent from './ModalContentShow';
import ExcursionModalContent from './ModalContentShow';
import ExcursionReservModal from './ReservModal';
import { ExcursionModalShow } from './ModalShow';

function ExcursionCard(excursion:tpExcursion) {
    
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
                <p className="title-item">{excursion.name}</p>
            
            
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

            <ExcursionReservModal excursion={excursion} show={showR} handleClose={handleCloseR}/>
            
            <ExcursionModalShow excursion={excursion} show={show} handleClose={handleClose}/>
        </>
    );
}

export default ExcursionCard;
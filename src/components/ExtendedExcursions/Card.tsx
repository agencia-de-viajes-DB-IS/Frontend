import { useState } from 'react';
import img from '../../images/anders.jpg'
import './styles.css'
import { tpExtendedExcursionGet } from '../../types/types';
import ExcursionReservModal from '../Excursions/ReservModal';
import { ExtendedExcursionModalShow } from './ModalShow';

interface ExtendedExcursionCardProps {
    excursion:tpExtendedExcursionGet
}

function ExtendedExcursionCard({excursion}:ExtendedExcursionCardProps) {
    
    // Para manejar el Modal de informacion
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Para manejar el Modal de la reservacion
    const [showR, setShowR] = useState(false);
    const handleCloseR = () => setShowR(false);
    const handleShowR = () => setShowR(true);

    const token = localStorage.getItem('userToken')

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
                    {token &&
                    <div className='btn-card'>
                        <button type="button" className='btn-reserv' onClick={handleReserv}>Reservar</button>
                    </div>
                    }
                    <div className='btn-card'>
                        <button type="button" className='btn btn-secondary' onClick={handleShow}>Info</button>
                    </div>
                </div>
            </div>

            {/* La reservacion que se utiliza es la de excursiones normales */}
            <ExcursionReservModal excursion={excursion} show={showR} handleClose={handleCloseR}/>
            
            <ExtendedExcursionModalShow excursion={excursion} show={show} handleClose={handleClose}/>
        </>
    );
}

export default ExtendedExcursionCard;
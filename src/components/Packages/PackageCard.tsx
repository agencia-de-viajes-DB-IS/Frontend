import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/roca.jpg'
import './styles.css'
import { tpPackage } from '../../types/types';
import { MDBModalContent } from 'mdb-react-ui-kit';
import ModalContent from './InfoModalContent';
import AgencyModalContent from './InfoModalContent';
import PackageModalContent from './InfoModalContent';
import PackageModal from './PackageModal';
import { Button } from 'react-bootstrap';
import PackageReservModal from './ReservModal';

function PackageCard(package1:tpPackage) {

    // Para manejar el Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const usuarioLogeado = true;

    const handleReserv = () => {

    }

    return (
        <>
            <div className="card-client">
                <div className="user-picture">
                    <img src={img} alt="foto"/>
                </div>
                <p className="title-item">{package1.departureDate}</p>

                
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

            <PackageReservModal package1={package1} show={show} handleClose={handleClose}/>
            
            <PackageModal package1={package1} show={show} handleClose={handleClose}/>
        </>
    );
}

export default PackageCard;
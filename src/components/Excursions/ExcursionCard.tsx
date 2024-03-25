import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/anders.jpg'
import './styles.css'
import { tpExcursion } from '../../types/types';
import { MDBModalContent } from 'mdb-react-ui-kit';
import ModalContent from './ModalContent';
import AgencyModalContent from './ModalContent';
import ExcursionModalContent from './ModalContent';
import ExcursionModal from './ExcursionModal';

function ExcursionCard(excursion:tpExcursion) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="card-client" onClick={handleShow}>
                <div className="user-picture">
                    <img src={img} alt="foto"/>
                </div>
                <p className="title-item">{excursion.location}</p>
            </div>
            
            <ExcursionModal excursion={excursion} show={show} handleClose={handleClose}/>
        </>
    );
}

export default ExcursionCard;
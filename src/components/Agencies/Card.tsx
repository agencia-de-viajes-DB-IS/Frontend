import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/office.jpg'
import './styles.css'
import { tpAgency } from '../../types/types';
import { MDBModalContent } from 'mdb-react-ui-kit';
import ModalContent from './ModalContent';
import AgencyModalContent from './ModalContent';
import AgencyModal from './ModalShow';

function AgencyCard(agency:tpAgency) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="card-client" onClick={handleShow}>
                <div className="user-picture">
                    <img src={img} alt="foto" className='img-fluid'/>
                </div>
                <p className="title-item">{agency.name}</p>
            </div>
            
            <AgencyModal agency={agency} show={show} handleClose={handleClose}/>
        </>
    );
}

export default AgencyCard;
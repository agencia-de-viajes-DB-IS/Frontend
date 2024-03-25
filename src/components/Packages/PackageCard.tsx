import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/roca.jpg'
import './styles.css'
import { tpPackage } from '../../types/types';
import { MDBModalContent } from 'mdb-react-ui-kit';
import ModalContent from './ModalContent';
import AgencyModalContent from './ModalContent';
import PackageModalContent from './ModalContent';
import PackageModal from './PackageModal';

function PackageCard(package1:tpPackage) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="card-client" onClick={handleShow}>
                <div className="user-picture">
                    <img src={img} alt="foto"/>
                </div>
                <p className="title-item">{package1.departureDate}</p>
            </div>
            
            <PackageModal package1={package1} show={show} handleClose={handleClose}/>
        </>
    );
}

export default PackageCard;
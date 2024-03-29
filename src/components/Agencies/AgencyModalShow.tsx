import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/office.jpg'
import './styles.css'
import { tpAgency } from '../../types/types';
import { MDBModalContent } from 'mdb-react-ui-kit';
import ModalContent from './ModalContent';
import AgencyModalContent from './ModalContent';

interface AgencyModalProp {
    agency:tpAgency,
    show:boolean,
    handleClose:() => void
}

function AgencyModal({agency, show, handleClose}:AgencyModalProp) {

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {agency.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AgencyModalContent {...agency}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AgencyModal;
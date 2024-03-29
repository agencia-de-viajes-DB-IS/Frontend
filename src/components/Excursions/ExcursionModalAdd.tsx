import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/anders.jpg'
import './styles.css'
import { tpExcursion } from '../../types/types';
import { MDBModalContent } from 'mdb-react-ui-kit';
import AgencyModalContent from './ModalContent';

interface ExcursionModalProp {
    excursion:tpExcursion,
    show:boolean,
    handleClose:() => void
}

function ExcursionModal({ excursion, show, handleClose }:ExcursionModalProp) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {excursion.location}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ExcursionForm {...excursion}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ExcursionModal;
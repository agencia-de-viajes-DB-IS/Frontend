import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/roca.jpg'
import './styles.css'
import { tpExcursion } from '../../types/types';
import { MDBModalContent } from 'mdb-react-ui-kit';
import ExcursionReservModalContent from './ReservModalContent';

interface ExcursionModalProp {
    excursion:tpExcursion,
    show:boolean,
    handleClose:() => void
}

function ExcursionReservModal({ excursion, show, handleClose }:ExcursionModalProp) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Reservar Excursion {excursion.location}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ExcursionReservModalContent {...excursion}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ExcursionReservModal;
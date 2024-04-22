import Modal from 'react-bootstrap/Modal';
import './styles.css'
import { tpExcursionGet } from '../../types/types';
import ExcursionReservModalContent from './ReservModalContent';

interface ExcursionModalProp {
    excursion:tpExcursionGet,
    show:boolean,
    handleClose:() => void
}

function ExcursionReservModal({ excursion, show, handleClose }:ExcursionModalProp) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Reservar Excursion {excursion.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ExcursionReservModalContent excursion={excursion} onClose={handleClose}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ExcursionReservModal;
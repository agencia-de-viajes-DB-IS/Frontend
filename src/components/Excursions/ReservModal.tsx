import Modal from 'react-bootstrap/Modal';
import './styles.css'
import { tpExcursion } from '../../types/types';
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
                    <ExcursionReservModalContent excursion={excursion}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ExcursionReservModal;
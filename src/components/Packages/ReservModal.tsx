import Modal from 'react-bootstrap/Modal';
import './styles.css'
import { tpPackageGet } from '../../types/types';
import PackageReservModalContent from './ReservModalContent';

interface PackageModalProp {
    package1:tpPackageGet,
    show:boolean,
    handleClose:() => void
}

function PackageReservModal({ package1, show, handleClose }:PackageModalProp) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Reservar Paquete {package1.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PackageReservModalContent {...package1}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PackageReservModal;
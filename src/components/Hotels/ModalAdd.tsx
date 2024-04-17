import HotelDealForm from './FormAdd';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { ModalProps } from '../../types/typesComponents';


export function HotelModal({fetchentity}:ModalProps) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        
            <Button className="btn btn-primary" variant="" onClick={handleShow}>
                Agregar
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Crear una Oferta de Hotel
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <HotelDealForm onClose={handleClose} fetchentity={fetchentity}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

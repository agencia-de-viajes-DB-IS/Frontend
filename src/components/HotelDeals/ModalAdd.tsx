import HotelDealForm from './FormAdd';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';


export function HotelDealModal() {

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
                    <HotelDealForm onClose={handleClose}/>
                </Modal.Body>
            </Modal>
        </>
    );
}
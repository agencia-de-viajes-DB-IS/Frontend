import ExcursionForm from './ExcursionFormAdd';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';


export function ExcursionModal() {

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
                        Crear una Excursión
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ExcursionForm/>
                </Modal.Body>
            </Modal>
        </>
    );
}

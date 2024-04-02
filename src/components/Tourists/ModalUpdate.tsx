import { Form } from './FormUpdate';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { ModalProps } from '../../types/typesComponents';
import { tpTourist } from '../../types/types';

interface ModalUpdateProps {
    fetchentity: () => void;
    tourist: tpTourist;
}

export function ModalUpdate({ fetchentity, tourist }:ModalUpdateProps) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        
            <Button className="btn btn-success me-3" variant="" onClick={handleShow}>
                Editar
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Editar un Turista
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onClose={handleClose} fetchentity={fetchentity} tourist={tourist}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

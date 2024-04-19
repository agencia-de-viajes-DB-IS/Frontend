import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles.css'
import { Button } from 'react-bootstrap';
import FormAdd from './FormAdd';
import { ModalProps } from '../../types/typesComponents';

function ModalAdd({ fetchentity }:ModalProps) {

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
                        Agregar una facilidad
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormAdd onClose={handleClose} fetchentity={fetchentity}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalAdd;
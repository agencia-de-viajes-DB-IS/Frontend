import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import AgencyForm from './FormAdd';

interface AgencyModalProps {
    fetchAgencies: () => void;
}

function AgencyModal({fetchAgencies}:AgencyModalProps) {
    
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
                        Agregar una agencia
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AgencyForm onClose={handleClose} fetchAgencies={fetchAgencies}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AgencyModal;
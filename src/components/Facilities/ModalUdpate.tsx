import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles.css'
import { Button } from 'react-bootstrap';
import { FormUpdate } from './FormUpdate';
import { tpFacility } from '../../types/types';

interface FacilityModalProp {
    facility:tpFacility
    fetchentity: () => void;
}

function ModalUpdate({facility, fetchentity }:FacilityModalProp) {

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
                        Editar la facilidad
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormUpdate facility={facility} fetchentity={fetchentity} onClose={handleClose}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalUpdate;
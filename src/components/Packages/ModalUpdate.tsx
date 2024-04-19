import { FormUpdate } from './FormUpdate';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { tpPackagePost } from '../../types/types';

interface ModalUpdateProp {
    package1: tpPackagePost;
    fetchentity: () => void;
}

export function ModalUpdate({package1, fetchentity}:ModalUpdateProp) {

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
                        Editar un Paquete
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormUpdate package1={package1} onClose={handleClose} fetchentity={fetchentity}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

import { PackageForm} from './FormUpdate';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { tpPackage } from '../../types/types';

interface ModalUpdateProp {
    package1: tpPackage;
}

export function ModalUpdate({package1}:ModalUpdateProp) {

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
                    <PackageForm package1={package1} onClose={handleClose}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

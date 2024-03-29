import Modal from 'react-bootstrap/Modal';
import './styles.css'
import { tpAgency } from '../../types/types';
import { Button } from 'react-bootstrap';
import AgencyFormUpdate from './AgencyFormUpdate';
import { useState } from 'react';

interface AgencyModalProp {
    agency:tpAgency
}

function AgencyModalUpdate({agency}:AgencyModalProp) {

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
                        Editar Agencia
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AgencyFormUpdate agency={agency}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AgencyModalUpdate;
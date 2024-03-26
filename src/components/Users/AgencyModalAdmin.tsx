import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles.css'
import { tpAgency } from '../../types/types'; 
import RegisterForm from '../Register/RegisterForm';
import { Button } from 'react-bootstrap';
import AgencyForm from './AgencyForm';

interface AgencyModalProp {
    agency:tpAgency,
    show:boolean,
    handleClose:() => void
}


function AgencyModalAdmin() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    return (
        <>
            <Button className="text-black bg-red btn-register" variant="" onClick={handleShow}>
                Agregar
            </Button>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AgencyForm/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AgencyModalAdmin;
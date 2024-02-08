import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import RegisterForm from './RegisterForm';
import './styles.css'

function RegisterModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="text-light btn-register" variant="" onClick={handleShow}>
                Registrarse
            </Button>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Bienvenido
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegisterForm/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default RegisterModal;
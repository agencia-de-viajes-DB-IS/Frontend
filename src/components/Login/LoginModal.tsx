import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { LoginForm } from "./LoginForm";

function LoginModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="text-light" variant="" onClick={handleShow}>
                Iniciar Sesión
            </Button>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Bienvenido
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default LoginModal;

import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { LoginForm } from "./LoginForm";
import './styles.css'

interface LoginModalProp {
    setLoggedUser: (arg0:boolean) => void;
}

function LoginModal({setLoggedUser}:LoginModalProp) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button id='btn-login' className="text-light" variant="" onClick={handleShow}>
                Iniciar Sesión
            </Button>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Bienvenido
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm onClose={handleClose} setLoggedUser={setLoggedUser}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default LoginModal;

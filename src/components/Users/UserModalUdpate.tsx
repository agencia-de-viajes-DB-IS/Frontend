import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles.css'
import { Button } from 'react-bootstrap';
import UserForm from './UserFormUpdate';
import { tpUser } from '../../types/types';

interface UserModalProp {
    user:tpUser
}

function UserModalUpdate({user}:UserModalProp) {
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
                        Editar el usuario
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserForm user={user}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UserModalUpdate;
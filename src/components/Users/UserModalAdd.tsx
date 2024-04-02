import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles.css'
import { Button } from 'react-bootstrap';
import UserForm from './UserFormAdd';

interface UserModalAddProps {
    fetchUsers: () => void;
}

function UserModalAdd({ fetchUsers }:UserModalAddProps) {

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
                        Agregar un usuario
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserForm onClose={handleClose} fetchUsers={fetchUsers}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UserModalAdd;
import { ExcursionForm} from './FormUpdate';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { tpExcursion } from '../../types/types';

interface ExcursionModalUpdateProp {
    excursion: tpExcursion;
}

export function ExcursionModalUpdate({excursion}:ExcursionModalUpdateProp) {

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
                        Editar una Excursión
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ExcursionForm excursion={excursion}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

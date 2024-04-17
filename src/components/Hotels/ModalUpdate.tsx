import { HotelForm} from './FormUpdate';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { tpHotels } from '../../types/types';

interface HotelModalUpdateProp {
    hotel: tpHotels;
    fetchentity: () => void;
}

export function HotelModalUpdate({hotel, fetchentity}:HotelModalUpdateProp) {

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
                        Editar un Hotel
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <HotelForm hotel={hotel} onClose={handleClose} fetchentity={fetchentity}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

import { HotelDealForm} from './FormUpdate';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { tpHotelDeals } from '../../types/types';

interface HotelDealModalUpdateProp {
    hotelDeal: tpHotelDeals;
    fetchentities: () => void;
}

export function HotelDealModalUpdate({hotelDeal, fetchentities}:HotelDealModalUpdateProp) {

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
                        Editar una Oferta de Hotel
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <HotelDealForm hotelDeal={hotelDeal} onClose={handleClose} fetchentities={fetchentities}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

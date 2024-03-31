import { ExcursionForm} from './FormUpdate';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { tpExcursion } from '../../types/types';
import ExcursionModalContent from './ModalContentShow';

interface ExcursionModalShowProp {
    excursion: tpExcursion;
    show: boolean;
    handleClose: () => void;
}

export function ExcursionModalShow({excursion, show, handleClose}:ExcursionModalShowProp) {


    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {excursion.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ExcursionModalContent excursion={excursion}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

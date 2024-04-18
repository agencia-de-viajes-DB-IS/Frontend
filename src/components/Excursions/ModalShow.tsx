import Modal from 'react-bootstrap/Modal';
import { tpExcursionGet } from '../../types/types';
import ExcursionModalContent from './ModalContentShow';

interface ExcursionModalShowProp {
    excursion: tpExcursionGet;
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
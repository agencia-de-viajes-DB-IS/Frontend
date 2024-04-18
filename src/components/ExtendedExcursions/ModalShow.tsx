import Modal from 'react-bootstrap/Modal';
import { tpExtendedExcursionGet } from '../../types/types';
import { ExtendedExcursionModalContent } from './ModalContentShow';

interface ExtendedExcursionModalShowProp {
    excursion: tpExtendedExcursionGet;
    show: boolean;
    handleClose: () => void;
}

export function ExtendedExcursionModalShow({excursion, show, handleClose}:ExtendedExcursionModalShowProp) {

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {excursion.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ExtendedExcursionModalContent excursion={excursion}/>
                </Modal.Body>
            </Modal>
        </>
    );
}




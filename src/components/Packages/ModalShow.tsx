import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles.css'
import { tpPackageGet } from '../../types/types';
import PackageModalContent from './ModalContent';

interface PackageModalProp {
    package1:tpPackageGet,
    show:boolean,
    handleClose:() => void
}

function PackageModal({ package1, show, handleClose }:PackageModalProp) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {package1.departureDate}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PackageModalContent {...package1}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PackageModal;
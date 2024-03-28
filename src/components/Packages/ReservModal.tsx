import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/roca.jpg'
import './styles.css'
import { tpPackage } from '../../types/types';
import { MDBModalContent } from 'mdb-react-ui-kit';
import PackageReservModalContent from './PackageReservModalContent';

interface PackageModalProp {
    package1:tpPackage,
    show:boolean,
    handleClose:() => void
}

function PackageReservModal({ package1, show, handleClose }:PackageModalProp) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {package1.departureDate}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PackageReservModalContent {...package1}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PackageReservModal;
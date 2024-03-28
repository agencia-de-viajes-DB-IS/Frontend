import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/anders.jpg'
import './styles.css'
import { tpAgency, tpPackage } from '../../types/types';
import AgencyModal from '../Agencies/AgencyModal';

function PackageModalContent(package1:tpPackage) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const agency:tpAgency = {
        id: 90,
        name: "Cuba Verde",
        address: "string",
        faxNumber: "string",
        email: "string"
    };

    return (
        <>
            <div className='package-info-containier'>
                <div className='img-package'>
                    <img src={img} alt="" className='img-fluid'/>
                </div>
                <div className='package-info'>
                    <div className='package-item'>
                        <span>Agencia</span>
                        <p>Nombre de la Agencia</p>  
                    </div>
                    <div className='package-item'>
                        <span>Precio</span>
                        <p>{package1.price}</p>  
                    </div>
                    <div className='package-item'>
                        <span>Fecha de Salida</span>
                        <p>{package1.arrivalDate}</p>  
                    </div>
                    <div className='package-item'>
                        <span>Fecha de Llegada</span>
                        <p>{package1.departureDate}</p>  
                    </div>
                </div>
                <div className='package-item'>
                    <span>Descripción</span>
                    <p>{package1.description}</p>  
                </div>   
            </div>      
            <div className='package-seemore'>
                <button className='btn-packages btn btn-danger' onClick={handleShow}>Ver Agencia</button>
                <button className='btn-packages btn btn-primary'>Ver Excursiones</button>
            </div>

            <AgencyModal agency={agency} show={show} handleClose={handleClose}/>
        </>
    );
}

export default PackageModalContent;
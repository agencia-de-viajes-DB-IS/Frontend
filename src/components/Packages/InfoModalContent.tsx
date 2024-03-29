import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/anders.jpg'
import './styles.css'
import { tpAgency, tpPackage } from '../../types/types';
import AgencyModal from '../Agencies/AgencyModalShow';
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    // Funcion para mostrar las excursiones que contiene el paquete
    const handleShowExcursions = () => {
        navigate('/excursions');
    }

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
                <div className='facilities-section'>
                    <h3 className='w-100 text-center'>Facilidades</h3>
                    <div className='facilities-content'>
                        <div className='facility-item'>
                            <span>Facilidad 1</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium dolores maxime, reiciendis neque quaerat porro quasi quam voluptates iure possimus, corporis officiis. Esse eveniet autem quibusdam fugit, quasi blanditiis? Minima.</p>
                        </div>
                        <div className='facility-item'>
                            <span>Facilidad 2</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium dolores maxime, reiciendis neque quaerat porro quasi quam voluptates iure possimus, corporis officiis. Esse eveniet autem quibusdam fugit, quasi blanditiis? Minima.</p>
                        </div>
                        <div className='facility-item'>
                            <span>Facilidad 3</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium dolores maxime, reiciendis neque quaerat porro quasi quam voluptates iure possimus, corporis officiis. Esse eveniet autem quibusdam fugit, quasi blanditiis? Minima.</p>
                        </div>
                    </div>    
                </div>   
            </div>      
            <div className='package-seemore'>
                <button className='btn-packages btn btn-danger' onClick={handleShow}>Ver Agencia</button>
                <button className='btn-packages btn btn-primary' onClick={handleShowExcursions}>Ver Excursiones</button>
            </div>

            <AgencyModal agency={agency} show={show} handleClose={handleClose}/>
        </>
    );
}

export default PackageModalContent;
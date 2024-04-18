import { useState } from 'react';
import img from '../../images/anders.jpg'
import './styles.css'
import { tpAgency, tpPackageGet } from '../../types/types';
import AgencyModal from '../Agencies/ModalShow';
import { useNavigate } from "react-router-dom";

function PackageModalContent(package1:tpPackageGet) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // Arreglar la fecha de llegada
    const fechaString = package1.departureDate;
    const fecha = new Date(fechaString);
    const opcionesFecha: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const opcionesHora: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit'};
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
    const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);
    
    // Arreglar la fecha de salida
    const fechaString1 = package1.arrivalDate;
    const fecha1 = new Date(fechaString1);
    const opcionesFecha1: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const opcionesHora1: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit'};
    const fechaFormateada1 = fecha1.toLocaleDateString('es-ES', opcionesFecha1);
    const horaFormateada1 = fecha1.toLocaleTimeString('es-ES', opcionesHora1);
    console.log(package1)

    const agency:tpAgency = {
        id: "90",
        name: "Cuba Verde",
        address: "string",
        faxNumber: 4000,
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
                        <p>
                            <p className='mb-0'>{fechaFormateada1}</p>
                            <p>{horaFormateada1}</p>
                        </p> 
                    </div>
                    <div className='package-item'>
                        <span>Fecha de Llegada</span>
                        <p>
                            <p className='mb-0'>{fechaFormateada}</p>
                            <p>{horaFormateada}</p>
                        </p>  
                    </div>
                </div>
                <div className='package-item'>
                    <span>Descripción</span>
                    <p>{package1.description}</p>  
                </div>
                <hr />
                <div className='facilities-section'>
                    <h3 className='w-100 text-center'>Facilidades</h3>
                    <div className='facilities-content'>
                        {package1.facilities.map((facility) => (
                            <div className='facility-item'>
                                <span>{facility.name}</span>
                                <p>{facility.description}</p>
                            </div>
                        ))}
                    </div>    
                </div>  
                <hr />
                <div className='excursion-section'>
                    <h3 className='w-100 text-center'>Excursiones</h3>
                    <div className='excursions-content w-100'>
                        {package1.extendedExcursions.map((excursion) => (
                            <div className='excursion mb-3'>
                                <div className='excursion-item d-flex'>
                                    <span className='fw-bold me-2'>Nombre: </span>
                                    <p className='mb-0'>{excursion.name}</p>
                                </div>
                                <div className='excursion-item d-flex'>
                                    <span className='fw-bold me-2'>Localización: </span>
                                    <p className='mb-0'>{excursion.location}</p>
                                </div>
                                <div className='excursion-item d-flex'>
                                    <span className='fw-bold me-2'>Fecha de Salida: </span>
                                    <p className='mb-0'>{excursion.arrivalDate}</p>
                                </div>
                                <div className='excursion-item d-flex'>
                                    <span className='fw-bold me-2'>Fecha de Llegada: </span>
                                    <p className='mb-0'>{excursion.departureDate}</p>
                                </div>
                                <div className='excursion-item d-flex'>
                                    <span className='fw-bold me-2'>Precio: </span>
                                    <p className='mb-0'>{excursion.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>    
                </div>   
            </div>      
            <div className='package-seemore'>
                <button className='btn-packages btn btn-danger' onClick={handleShow}>Ver Agencia</button>
            </div>

            <AgencyModal agency={agency} show={show} handleClose={handleClose}/>
        </>
    );
}

export default PackageModalContent;
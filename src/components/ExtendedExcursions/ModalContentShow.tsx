import { useState } from 'react';
import img from '../../images/anders.jpg'
import './styles.css'
import { tpExtendedExcursionGet } from '../../types/types';
import AgencyModal from '../Agencies/ModalShow';

interface ExtendedExcursionModalContentProp {
    excursion:tpExtendedExcursionGet
}

export function ExtendedExcursionModalContent({ excursion }: ExtendedExcursionModalContentProp) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Arreglar la fecha de llegada
    const fechaString = excursion.departureDate;
    const fecha = new Date(fechaString);
    const opcionesFecha: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const opcionesHora: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
    const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);
    
    // Arreglar la fecha de salida
    const fechaString1 = excursion.arrivalDate;
    const fecha1 = new Date(fechaString1);
    const opcionesFecha1: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const opcionesHora1: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 };
    const fechaFormateada1 = fecha1.toLocaleDateString('es-ES', opcionesFecha1);
    const horaFormateada1 = fecha1.toLocaleTimeString('es-ES', opcionesHora1);
    
    return (
        <>
            <div className='excursion-info-containier'>
                <div className='img-excursion'>
                    <img src={img} alt="" className='img-fluid'/>
                </div>
                <div className='excursion-info'>
                    <div className='excursion-agency'>
                        <span>Agencia</span>
                        <p>{excursion.agency.name}</p>  
                    </div>
                    <div className='excursion-arrivalDate'>
                        <span>Fecha de Salida</span>
                        <p>
                            <p className='mb-0'>{fechaFormateada1}</p>
                            <p>{horaFormateada1.substring(0,8)}</p>
                        </p> 
                    </div>
                    <div className='excursion-departure'>
                        <span>Fecha de Llegada</span>
                        <p>
                            <p className='mb-0'>{fechaFormateada}</p>
                            <p>{horaFormateada.substring(0,8)}</p>
                        </p> 
                    </div>
                    <div className='excursion-location'>
                        <span>Localización</span>
                        <p>{excursion.location}</p>   
                    </div>
                    <div className='excursion-price'>
                        <span>Precio</span>
                        <p>${excursion.price}</p>   
                    </div>
                </div>   
                <div className='hotelDeals'>
                    <h4 className='text-center mb-3'>Ofertas de Hotel Disponibles</h4>
                    {excursion.hotelDeals.map((ofert) => (                       
                        <div>
                            <p className='ms-3'>- {ofert.name}</p>
                        </div>
                    ))}
                </div>
            </div>      
            <div className='excursion-seemore'>
                <button className='btn-excursions btn btn-danger' onClick={handleShow}>Ver Agencia</button>
            </div>

            <AgencyModal agency={excursion.agency} show={show} handleClose={handleClose}/>
        </>
    );
}
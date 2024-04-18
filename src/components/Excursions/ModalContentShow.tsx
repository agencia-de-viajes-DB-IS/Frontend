import { useState } from 'react';
import img from '../../images/anders.jpg'
import './styles.css'
import { tpExcursionGet } from '../../types/types';
import AgencyModal from '../Agencies/ModalShow';

interface ExcursionModalContentProp {
    excursion:tpExcursionGet
}

function ExcursionModalContent({ excursion }: ExcursionModalContentProp) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Arreglar la fecha
    const fechaString = excursion.arrivalDate;
    const fecha = new Date(fechaString);
    const opcionesFecha: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const opcionesHora: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
    const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);
    
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
            </div>      
            <div className='excursion-seemore'>
                <button className='btn-excursions btn btn-danger' onClick={handleShow}>Ver Agencia</button>
            </div>

            <AgencyModal agency={excursion.agency} show={show} handleClose={handleClose}/>
        </>
    );
}

export default ExcursionModalContent;
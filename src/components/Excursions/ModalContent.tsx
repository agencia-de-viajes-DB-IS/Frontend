import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/anders.jpg'
import './styles.css'
import { tpExcursion } from '../../types/types';
import AgencyModal from '../Agencies/AgencyModalShow';

function ExcursionModalContent(excursion:tpExcursion) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                        <p>{excursion.arrivalDate}</p> 
                    </div>
                    <div className='excursion-location'>
                        <span>Localización</span>
                        <p>{excursion.location}</p>   
                    </div>
                    <div className='excursion-price'>
                        <span>Precio</span>
                        <p>{excursion.price}</p>   
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
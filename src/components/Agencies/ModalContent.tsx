import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import img from '../../images/office.jpg'
import { useNavigate } from "react-router-dom";
import './styles.css'
import { tpAgency } from '../../types/types';

function AgencyModalContent(agency:tpAgency) {

    const navigate = useNavigate();

    const handleExcursions = () => {
        navigate("/excursions")
    }

    return (
        <>
            <div className='info-containier'>
                <div className='img-agency'>
                    <img src={img} alt="" className='img-fluid' />
                </div>
                <div className='agency-info'>
                    <div className='agency-email'>
                        <span>Email electrónico</span>
                        <p>{agency.email}</p>  
                    </div>
                    <div className='agency-address'>
                        <span>Dirección</span>
                        <p>{agency.address}</p> 
                    </div>
                    <div className='agency-faxnumber'>
                        <span>Número de Fax</span>
                        <p>{agency.faxNumber}</p>   
                    </div>
                </div>   
            </div>      
            <div className='agency-seemore'>
                <button className='btn-excursions btn btn-primary' onClick={handleExcursions}>Ver excursiones</button>
                <button className='btn-hotelDeals btn btn-danger'>Ver Ofertas de Hotel</button>
                <button className='btn-packages btn btn-success'>Ver Paquetes</button>
            </div>
        </>
    );
}

export default AgencyModalContent;
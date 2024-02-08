import React, { useState } from 'react';
import './styles.css'

export function Filter() {

    // Todas las propiedad2 y la propiedad2 seleccionada
    const [propiedades2, setPropiedades2] = useState(['Opcion1', 'Opcion2', 'Opcion3', 'Opcion4', 'Opcion5'])
    const [selectedPropiedad2, setSelectedPropiedad2] = useState('');
   // Seleccionar una propiedad2
    const handlePropiedad2Change: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedPropiedad2(event.target.value);
    };

    // Todas las propiedad3 y la propiedad3 seleccionada
    const [propiedades3, setPropiedades3] = useState(['Opcion1', 'Opcion2', 'Opcion3', 'Opcion4', 'Opcion5'])
    const [selectedPropiedad3, setSelectedPropiedad3] = useState('');
   // Seleccionar una propiedad3
    const handlePropiedad3Change: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedPropiedad3(event.target.value);
    };

    // Todas las propiedad4 y la propiedad4 seleccionada
    const [propiedades4, setPropiedades4] = useState(['Opcion1', 'Opcion2', 'Opcion3', 'Opcion4', 'Opcion5'])
    const [selectedPropiedad4, setSelectedPropiedad4] = useState('');
   // Seleccionar una propiedad4
    const handlePropiedad4Change: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedPropiedad4(event.target.value);
    };

    return (
        <div className='search-container'>
            <div className="search-section">
                <div className="search-from">
                    <label htmlFor="" className='agency-label'>Propiedad2</label>
                    <select id="propiedad2" value={selectedPropiedad2} onChange={handlePropiedad2Change}>
                        {propiedades2.map((propiedad2, index) => (
                            <option key={index} value={propiedad2}>{propiedad2}</option>
                        ))}
                    </select>
                </div>
                <div className="search-from">
                    <label htmlFor="" className='agency-label'>Propiedad3</label>
                    <select id="propiedad3" value={selectedPropiedad3} onChange={handlePropiedad3Change}>
                        {propiedades3.map((propiedad3, index) => (
                            <option key={index} value={propiedad3}>{propiedad3}</option>
                        ))}
                    </select>
                </div>
                <div className="search-from">
                    <label htmlFor="" className='agency-label'>Propiedad4</label>
                    <select id="propiedad4" value={selectedPropiedad4} onChange={handlePropiedad4Change}>
                        {propiedades4.map((propiedad4, index) => (
                            <option key={index} value={propiedad4}>{propiedad4}</option>
                        ))}
                    </select>
                </div>
                <div className="search-btn agency-btn">
                    <button type="button" onClick={alert}>Buscar</button>
                </div>
            </div>
        </div>
    )
}
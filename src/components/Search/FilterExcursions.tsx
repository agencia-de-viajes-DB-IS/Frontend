import React, { useEffect, useState } from 'react';
import './styles.css'
import { tpExcursionGet, tpExtendedExcursionGet } from '../../types/types';
import axios from 'axios';

interface FilterProps {
    setExcursions: React.Dispatch<React.SetStateAction<tpExcursionGet[]>>;
    setExtendedExcursions: React.Dispatch<React.SetStateAction<tpExtendedExcursionGet[]>>;
    initialAgency?:string;
}

export function Filter({setExcursions, setExtendedExcursions, initialAgency}: FilterProps) {

    const [allExcursions, setAllExcursions] = useState<tpExcursionGet[]>([])
    const [allExtendedExcursions, setAllExtendedExcursions] = useState<tpExtendedExcursionGet[]>([])


    // Todas las agencias y la agencia seleccionada
    const [agencies, setAgencies] = useState<string[]>([]);
    // Usar initialAgency para establecer el valor inicial de selectedAgency
    const [selectedAgency, setSelectedAgency] = useState<string>(initialAgency ?? 'Todos');
   // Seleccionar una agencia
    const handleAgencyChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedAgency(event.target.value);
    };

    // Todas las localizaciones y la localizacion seleccionada
    const [locations, setLocations] = useState<string[]>([])
    const [selectedLocation, setSelectedLocation] = useState('Todos');
   // Seleccionar una localizacion
    const handleLocationChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedLocation(event.target.value);
    };

    // Todas las fechas de salida y la fecha de salida seleccionada
    const [arrivalDates, setArrivalDates] = useState<string[]>([])
    const [selectedArrivalDate, setSelectedArrivalDate] = useState('Todos');
   // Seleccionar una fecha de salida
    const handleArrivalDateChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedArrivalDate(event.target.value);
    };

    // Todos los precios y el precio seleccionado
    const [prices, setPrices] = useState<string[]>([])
    const [selectedPrice, setSelectedPrice] = useState('Todos');
   // Seleccionar un precio
    const handlePriceChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedPrice(event.target.value);
    };

    const handleFilter = () => {
        let tempExcursions:tpExcursionGet[] = [...allExcursions];
        let tempExtendedExcursions:tpExtendedExcursionGet[] = [...allExtendedExcursions];
        
        // Revisar si hay filtro por agencia
        if(selectedAgency != 'Todos') {
            tempExcursions = allExcursions.filter(excursion => excursion.agency.name == selectedAgency);
            tempExtendedExcursions = allExtendedExcursions.filter(excursion => excursion.agency.name == selectedAgency);
        }
        // Revisar si hay filtro por localizacion
        if(selectedLocation != 'Todos') {
            tempExcursions = allExcursions.filter(excursion => excursion.location == selectedLocation);
            tempExtendedExcursions = allExtendedExcursions.filter(excursion => excursion.location == selectedLocation);
        }
        // Revisar si hay filtro por fecha de llegada
        if(selectedArrivalDate != 'Todos') {
            tempExcursions = allExcursions.filter(excursion => excursion.arrivalDate == selectedArrivalDate);
            tempExtendedExcursions = allExtendedExcursions.filter(excursion => excursion.arrivalDate == selectedArrivalDate);
        }
        // Revisar si hay filtro por precio
        if(selectedPrice != 'Todos') {
            tempExcursions = allExcursions.filter(excursion => excursion.price.toString() == selectedPrice);
            tempExtendedExcursions = allExtendedExcursions.filter(excursion => excursion.price.toString() == selectedPrice);
        }

        setExcursions(tempExcursions)
        setExtendedExcursions(tempExtendedExcursions)
        
    }

    useEffect(() => {
        const fetchPropiedades = async () => {

            try {
                const response = await axios.get<tpExcursionGet[]>(`http://localhost:5000/excursions`);
                setAllExcursions(response.data)

                const response2 = await axios.get<tpExtendedExcursionGet[]>(`http://localhost:5000/extended/excursions`);
                setAllExtendedExcursions(response2.data)
                // Array con los valores de las propiedades
                let excursionAgencies = response.data.map(excursion => excursion.agency.name);
                let excursionLocations = response.data.map(excursion => excursion.location);
                let excursionArrivalDates = response.data.map(excursion => excursion.arrivalDate);
                let excursionPrices = response.data.map(excursion => excursion.price);
                
                response2.data.forEach(e => {
                    console.log(e)
                    excursionAgencies.push(e.agency.name)
                    excursionLocations.push(e.location)
                    excursionArrivalDates.push(e.arrivalDate)
                    excursionPrices.push(e.price)
                })

                // Array con los valores de las propiedades sin repetir
                const agenciesSet = [... new Set(excursionAgencies)];
                const locationsSet = [... new Set(excursionLocations)];
                const arrivalDatesSet = [... new Set(excursionArrivalDates)];
                const pricessSet = [... new Set(excursionPrices)];

                agenciesSet.sort();
                locationsSet.sort();
                arrivalDatesSet.sort();
                pricessSet.sort();

                const pricessSet1 = pricessSet.map(price => price.toString());

                // Agregarle propiedad Ninguno a todos
                agenciesSet.unshift('Todos');
                locationsSet.unshift('Todos');
                arrivalDatesSet.unshift('Todos');
                pricessSet1.unshift('Todos');
                
                // Agregar los valores
                setAgencies(agenciesSet);
                setLocations(locationsSet);
                setArrivalDates(arrivalDatesSet);
                setPrices(pricessSet1);

            } catch (error) {
                console.error('Error fetching agencies:', error);
            }
        };

        fetchPropiedades();
    },[]);

    return (
        <div className='search-container'>
            <div className="search-section">
                <div className="search-from">
                    <label htmlFor="" className='excursion-label'>Agencia</label>
                    <select id="agencia" value={selectedAgency} onChange={handleAgencyChange}>
                        {agencies.map((agency, index) => (
                            <option key={index} value={agency}>{agency}</option>
                        ))}
                    </select>
                </div>
                <div className="search-from">
                    <label htmlFor="" className='excursion-label'>Localización</label>
                    <select id="location" value={selectedLocation} onChange={handleLocationChange}>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>
                <div className="search-from">
                    <label htmlFor="" className='excursion-label'>Fecha De Salida</label>
                    <select id="arrivalDate" value={selectedArrivalDate} onChange={handleArrivalDateChange}>
                        {arrivalDates.map((arrivalDate, index) => (
                            <option key={index} value={arrivalDate}>{arrivalDate}</option>
                        ))}
                    </select>
                </div>
                <div className="search-from">
                    <label htmlFor="" className='excursion-label'>Precio</label>
                    <select id="prices" value={selectedPrice} onChange={handlePriceChange}>
                        {prices.map((price, index) => (
                            <option key={index} value={price}>{price}</option>
                        ))}
                    </select>
                </div>
                <div className="search-btn excursion-btn">
                    <button type="button" onClick={handleFilter}>Buscar</button>
                </div>
            </div>
        </div>
    )
}

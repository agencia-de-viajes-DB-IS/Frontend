import React, { useEffect, useState } from 'react';
import './styles.css'
import { tpPackage } from '../../types/types';
import axios from 'axios';

interface FilterProps {
    setPackages: React.Dispatch<React.SetStateAction<tpPackage[]>>;
}

export function Filter({setPackages}:FilterProps) {

    // Array con las agencias filtradas
    const [filteredPackages,setFilteredPackages] = useState<tpPackage[]>([])

    // Todas las agencias y la agencia seleccionada
    const [agencies, setAgencies] = useState<string[]>([])
    const [selectedAgency, setSelectedAgency] = useState<string>('Todos');
   // Seleccionar una agencia
    const handleAgencyChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedAgency(event.target.value);
    };

    // Todas las fechas de salida y la fecha de salida seleccionada
    const [arrivalDates, setArrivalDates] = useState<string[]>([])
    const [selectedArrivalDate, setSelectedArrivalDate] = useState('Todos');
   // Seleccionar una fecha de salida
    const handleArrivalDateChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedArrivalDate(event.target.value);
    };

    // Todas las fechas de salida y la fecha de salida seleccionada
    const [departureDates, setDepartureDates] = useState<string[]>([])
    const [selectedDepartureDate, setSelectedDepartureDate] = useState('Todos');
   // Seleccionar una fecha de salida
    const handleDepartureDateChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedDepartureDate(event.target.value);
    };

    // Todos los precios y el precio seleccionado
    const [prices, setPrices] = useState<string[]>([])
    const [selectedPrice, setSelectedPrice] = useState('Todos');
   // Seleccionar un precio
    const handlePriceChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedPrice(event.target.value);
    };


    const handleFilter = () => {
        let tempPackages:tpPackage[] = [...filteredPackages];
        
        // Revisar si hay filtro por agencia
        if(selectedAgency != 'Todos') {
            tempPackages = tempPackages.filter(package1 => package1.extendedExcursionIds[0].agency.name == selectedAgency);
        }
        // Revisar si hay filtro por fecha de llegada
        if(selectedDepartureDate != 'Todos') {
            tempPackages = tempPackages.filter(package1 => package1.departureDate == selectedDepartureDate);
        }
        // Revisar si hay filtro por fecha de salida
        if(selectedArrivalDate != 'Todos') {
            tempPackages = tempPackages.filter(package1 => package1.arrivalDate == selectedArrivalDate);
        }
        // Revisar si hay filtro por precio
        if(selectedPrice != 'Todos') {
            tempPackages = tempPackages.filter(package1 => package1.price.toString() == selectedPrice);
        }

        setPackages(tempPackages)
    }

    useEffect(() => {
        const fetchPropiedades = async () => {
            try {
                const response = await axios.get<tpPackage[]>('http://localhost:5000/packages');
                
                // Llenar el array de agencias filtradas
                setFilteredPackages(response.data);

                // Array con los valores de las propiedades
                const packageAgencies = response.data.map(package1 => "nombre de una agencia");
                const packageDepartureDates = response.data.map(package1 => package1.departureDate);
                const packageArrivalDates = response.data.map(package1 => package1.arrivalDate);
                const packagePrices = response.data.map(package1 => package1.price);

                // Array con los valores de las propiedades sin repetir
                const agenciesSet = [... new Set(packageAgencies)];
                const departureDatesSet = [... new Set(packageDepartureDates)];
                const arrivalDatesSet = [... new Set(packageArrivalDates)];
                const pricessSet = [... new Set(packagePrices)];

                agenciesSet.sort();
                departureDatesSet.sort();
                arrivalDatesSet.sort();
                pricessSet.sort();

                const pricessSet1 = pricessSet.map(price => price.toString());

                // Agregarle propiedad Ninguno a todos
                agenciesSet.unshift('Todos');
                departureDatesSet.unshift('Todos');
                arrivalDatesSet.unshift('Todos');
                pricessSet1.unshift('Todos');
                
                // Agregar los valores
                setAgencies(agenciesSet);
                setDepartureDates(departureDatesSet);
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
                    <label htmlFor="" className='excursion-label'>Fecha De Salida</label>
                    <select id="arrivalDate" value={selectedArrivalDate} onChange={handleArrivalDateChange}>
                        {arrivalDates.map((arrivalDate, index) => (
                            <option key={index} value={arrivalDate}>{arrivalDate}</option>
                        ))}
                    </select>
                </div>
                <div className="search-from">
                    <label htmlFor="" className='excursion-label'>Fecha De Llegada</label>
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

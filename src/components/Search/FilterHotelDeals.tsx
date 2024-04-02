import React, { useEffect, useState } from 'react';
import './styles.css'
import { tpHotelDeals } from '../../types/types';
import axios from 'axios';
import { format } from 'date-fns';

interface FilterProps {
    setHotelDeals: React.Dispatch<React.SetStateAction<tpHotelDeals[]>>;
}

export function Filter({setHotelDeals}:FilterProps) {

    // Array con todas las ofertas de hotel
    const [allHotelDeals,setAllHotelDeals] = useState<tpHotelDeals[]>([])

    // Array con las ofertas de hotel filtradas
    const [filteredHotelDeals,setFilteredHotelDeals] = useState<tpHotelDeals[]>([])

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
   // Seleccionar una fecha de llegada
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
        let tempHotelDeals:tpHotelDeals[] = [...allHotelDeals];
        
        // Revisar si hay filtro por fecha de llegada
        if(selectedDepartureDate != 'Todos') {
            tempHotelDeals = tempHotelDeals.filter(hotelDeal => hotelDeal.departureDate == selectedDepartureDate);
        }
        // Revisar si hay filtro por fecha de salida
        if(selectedArrivalDate != 'Todos') {
            tempHotelDeals = tempHotelDeals.filter(hotelDeal => hotelDeal.arrivalDate == selectedArrivalDate);
        }
        // Revisar si hay filtro por precio
        if(selectedPrice != 'Todos') {
            tempHotelDeals = tempHotelDeals.filter(hotelDeal => hotelDeal.price.toString() == selectedPrice);
        }

        setHotelDeals(tempHotelDeals)
    }

    useEffect(() => {
        const fetchPropiedades = async () => {
            try {
                const response = await axios.get<tpHotelDeals[]>('http://localhost:5000/hotelDeals');
                
                // Llenar el array de agencias filtradas
                setAllHotelDeals(response.data);

                // Array con los valores de las propiedades
                const hotelDealsDepartureDates = response.data.map(hotelDeal => hotelDeal.departureDate);
                const hotelDealsArrivalDates = response.data.map(hotelDeal => hotelDeal.arrivalDate);
                const hotelDealsPrices = response.data.map(hotelDeal => hotelDeal.price);

                // Array con los valores de las propiedades sin repetir
                const departureDatesSet = [... new Set(hotelDealsDepartureDates)];
                const arrivalDatesSet = [... new Set(hotelDealsArrivalDates)];
                const pricessSet = [... new Set(hotelDealsPrices)];

                departureDatesSet.sort();
                arrivalDatesSet.sort();
                pricessSet.sort();

                const pricessSet1 = pricessSet.map(price => price.toString());

                // Agregarle propiedad Ninguno a todos
                departureDatesSet.unshift('Todos');
                arrivalDatesSet.unshift('Todos');
                pricessSet1.unshift('Todos');
                
                // Agregar los valores
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
                        {departureDates.map((dp, index) => (
                            <option key={index} value={dp}>{dp}</option>
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

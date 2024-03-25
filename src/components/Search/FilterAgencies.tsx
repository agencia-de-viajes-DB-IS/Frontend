import React, { useEffect, useState } from 'react';
import './styles.css'
import { tpAgency } from '../../types/types';
import axios from 'axios';

interface FilterProps {
    setAgencies: React.Dispatch<React.SetStateAction<tpAgency[]>>;
}

export function Filter({ setAgencies }: FilterProps) {

    // Array con las agencias filtradas
    const [filteredAgencies,setFilteredAgencies] = useState<tpAgency[]>([])

    // Todos los emails y el address seleccionado
    const [emails, setEmails] = useState<string[]>(['Todos'])
    const [selectedEmail, setSelectedEmail] = useState('Todos');
   // Seleccionar un address
    const handleEmailChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedEmail(event.target.value);
    };

    // Todos los addresses y el address seleccionado
    const [addresses, setAddresses] = useState<string[]>(['Todos'])
    const [selectedAddress, setSelectedAddress] = useState('Todos');
   // Seleccionar un Address
    const handleAddressChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedAddress(event.target.value);
    };

    // Todos los FaxNumbers y el FaxNumber seleccionado
    const [faxNumbers, setFaxNumbers] = useState<string[]>(['Todos'])
    const [selectedFaxNumber, setSelectedFaxNumber] = useState('Todos');
   // Seleccionar un FaxNumber
    const handleFaxNumberChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedFaxNumber(event.target.value);
    };


    const handleFilter = () => {
        let tempAgencies:tpAgency[] = [...filteredAgencies];
        
        console.log(tempAgencies)
        // Revisar si hay filtro por correo
        if(selectedEmail != 'Todos') {
            tempAgencies = tempAgencies.filter(agency => agency.email == selectedEmail);
        }
        // Revisar si hay filtro por direccion
        if(selectedAddress != 'Todos') {
            tempAgencies = tempAgencies.filter(agency => agency.address == selectedAddress);
        }
        // Revisar si hay filtro por numero de fax
        if(selectedFaxNumber != 'Todos') {
            tempAgencies = tempAgencies.filter(agency => agency.faxNumber == selectedFaxNumber);
        }

        setAgencies(tempAgencies)
    }

    useEffect(() => {
        const fetchPropiedades = async () => {
            try {
                const response = await axios.get<tpAgency[]>('http://localhost:5000/agencies');

                // Llenar el array de agencias filtradas
                setFilteredAgencies(response.data)

                // Array con los valores de las propiedades repetidas
                const agencyEmails = response.data.map(agency => agency.email);
                const agencyAddresses = response.data.map(agency => agency.address);
                const agencyFaxNumbers = response.data.map(agency => agency.faxNumber);

                // Array con los valores de las propiedades sin repetir
                const emailsSet = [...new Set(agencyEmails)];
                const addressesSet = [...new Set(agencyAddresses)];
                const faxNumbersSet = [...new Set(agencyFaxNumbers)];

                // Agregarle propiedad Ninguno a todos
                emailsSet.unshift('Todos');
                addressesSet.unshift('Todos');
                faxNumbersSet.unshift('Todos');

                // Agregar los valores
                setEmails(emailsSet);
                setAddresses(addressesSet);
                setFaxNumbers(faxNumbersSet);
                
            } catch (error) {
                console.error('Error fetching agencies:', error);
            }
        };

        fetchPropiedades();
    }, []);

    return (
        <div className='search-container'>
            <div className="search-section">
                <div className="search-from">
                    <label htmlFor="" className='agency-label'>Correo Electrónico</label>
                    <select id="address" value={selectedEmail} onChange={handleEmailChange}>
                        {emails.map((address, index) => (
                            <option key={index} value={address}>{address}</option>
                        ))}
                    </select>
                </div>
                <div className="search-from">
                    <label htmlFor="" className='agency-label'>Dirección</label>
                    <select id="address" value={selectedAddress} onChange={handleAddressChange}>
                        {addresses.map((address, index) => (
                            <option key={index} value={address}>{address}</option>
                        ))}
                    </select>
                </div>
                <div className="search-from">
                    <label htmlFor="" className='agency-label'>Número de Fax</label>
                    <select id="propiedad4" value={selectedFaxNumber} onChange={handleFaxNumberChange}>
                        {faxNumbers.map((numeroFax, index) => (
                            <option key={index} value={numeroFax}>{numeroFax}</option>
                        ))}
                    </select>
                </div>
                <div className="search-btn agency-btn">
                    <button type="button" onClick={handleFilter}>Buscar</button>
                </div>
            </div>
        </div>
    )
}

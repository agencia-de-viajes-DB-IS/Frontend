import './styles.css'
import { DarkPicture } from "../../components/DarkPicture/Dark";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import AgencyCard from "../../components/Agencies/Card";
import { Filter } from '../../components/Search/FilterAgencies';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { tpAgency } from '../../types/types';


export function Agencies() {

    const [agencies,setAgencies] = useState<tpAgency[]>([]);

    useEffect(() => {
        // Recibir las agencias del servidor
        const fetchAgencies = async () => {
            try {
                const response = await axios.get<tpAgency[]>('http://localhost:5000/agencies');
                setAgencies(response.data);
            } catch (error) {
                console.error('Error fetching agencies:', error);
            }
        };

        fetchAgencies();
    }, []);

    return (
        <>
            <div className="agencies-main">
                <DarkPicture/>
                <Header/>
                
                <h1 id="agency-title">Agencias</h1>

                <Filter setAgencies={setAgencies}/>
            </div>

            <div className="agency-section">
                <div className="agency-container">
                    {agencies.map((agency, index) => (
                        <div key={index} className="item">
                            <AgencyCard {...agency}/>
                        </div>
                    ))}
                </div>
                
            </div>
        </>
    )
}
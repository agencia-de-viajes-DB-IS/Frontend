import { DarkPicture } from "../../components/DarkPicture/Dark";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { RecivedExcursions, tpExcursion } from "../../types/types";
import { useEffect, useState } from "react";
import './styles.css';
import { Filter } from "../../components/Search/FilterExcursions";
import ExcursionCard from "../../components/Excursions/ExcursionCard";
import axios from 'axios';
import { useParams } from 'react-router-dom';


export function Excursions() {

    const { agencyName } = useParams<{ agencyName: string }>();
    const [excursions,setExcursions] = useState<tpExcursion[]>([]);

    useEffect(() => {
        // Recibir las excursiones del servidor
        const fetchExcursions = async () => {
            try {
                const response = await axios.get<tpExcursion[]>('http://localhost:5000/excursions');

                setExcursions(response.data)
                
            } catch (error) {
                console.error('Error fetching excursions:', error);
            }
        };

        fetchExcursions();
    }, []);

    return (
        <>
            <div className="excursions-main">
                <DarkPicture/>
                <Header/>
                <h1 id="excursion-title">Excursiones</h1>
                {agencyName ? <Filter setExcursions={setExcursions}  initialAgency={agencyName}/> : <Filter setExcursions={setExcursions} />}
            </div>

            <div className="excursion-section">
                <div className="excursion-container">
                    {excursions.map((excursion, index) => (
                        <div key={index} className="item">
                            <ExcursionCard {...excursion}/>
                        </div>
                    ))}
                </div>
                
            </div>
        </>
    )
}

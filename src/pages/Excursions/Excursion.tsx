import { DarkPicture } from "../../components/DarkPicture/Dark";
import { Header } from "../../components/Header/Header";
import { tpAgency, tpExcursionGet, tpExtendedExcursionGet } from "../../types/types";
import { useEffect, useState } from "react";
import './styles.css';
import { Filter } from "../../components/Search/FilterExcursions";
import ExcursionCard from "../../components/Excursions/Card";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ExtendedExcursionCard from "../../components/ExtendedExcursions/Card";


export function Excursions() {

    const { agencyName } = useParams<{ agencyName: string }>();
    const [excursions,setExcursions] = useState<tpExcursionGet[]>([]);
    const [extendedExcursions,setExtendedExcursions] = useState<tpExtendedExcursionGet[]>([]);

    useEffect(() => {
        // Recibir las excursiones del servidor
        const fetchExcursions = async () => {
            try {
                if(agencyName) {

                    const response0 = await axios.get<tpAgency[]>(`http://localhost:5000/agencies`);
                    const agencyId = response0.data.find(e => e.name == agencyName)?.id

                    // Traer excursiones normales
                    const response = await axios.get<tpExcursionGet[]>(`http://localhost:5000/excursions?agencyIdFilter=${agencyId}`);
                    setExcursions(response.data)
                    
                    // Traer excursiones extendidas
                    const response1 = await axios.get<tpExtendedExcursionGet[]>(`http://localhost:5000/extended/excursions?agencyIdFilter=${agencyId}`);
                    setExtendedExcursions(response1.data)
                }
                else {

                    // Traer excursiones normales
                    const response = await axios.get<tpExcursionGet[]>(`http://localhost:5000/excursions`);
                    setExcursions(response.data)

                    // Traer excursiones extendidas
                    const response1 = await axios.get<tpExtendedExcursionGet[]>(`http://localhost:5000/extended/excursions`);
                    setExtendedExcursions(response1.data)
                }
                
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
                
                {/* Excursiones normales */}
                <div className="excursion-container">
                    {excursions.map((excursion, index) => (
                        <div key={index} className="item">
                            <ExcursionCard excursion={excursion}/>
                        </div>
                    ))}
                </div>

                {/* Excursiones extendidas */}
                <div className="excursion-container">
                    {extendedExcursions.map((excursion, index) => (
                        <div key={index} className="item">
                            <ExtendedExcursionCard excursion={excursion}/>
                        </div>
                    ))}
                </div>
                
            </div>
        </>
    )
}

import { DarkPicture } from "../../components/DarkPicture/Dark";
import { Header } from "../../components/Header/Header";
import { tpPackage } from "../../types/types";
import { useEffect, useState } from "react";
import './styles.css';
import { Filter } from "../../components/Search/FilterPackages";
import PackageCard from "../../components/Packages/Card";
import axios from 'axios';


export function Packages() {

    const [packages,setPackages] = useState<tpPackage[]>([]);

    useEffect(() => {
        // Recibir las excursiones del servidor
        const fetchPackages = async () => {
            try {
                const response = await axios.get<tpPackage[]>('http://localhost:5000/packages');

                setPackages(response.data)
                
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };

        fetchPackages();
    }, []);

    return (
        <>
            <div className="packages-main">
                <DarkPicture/>
                <Header/>
                <h1 id="package-title">Paquetes</h1>
                <Filter setPackages={setPackages}/>
            </div>

            <div className="package-section">
                <div className="package-container">
                    {packages.map((package1, index) => (
                        <div key={index} className="item">
                            <PackageCard {...package1}/>
                        </div>
                    ))}
                </div>
                
            </div>
        </>
    )
}
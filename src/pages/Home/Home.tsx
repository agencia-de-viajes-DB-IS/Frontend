import { DarkPicture } from "../../components/DarkPicture/Dark";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { RecivedExcursions, tpExcursion } from "../../types/types";
import './styles.css'
import axios from 'axios';
import img from '../../images/montaingirl.jpg'
import React, { useEffect, useState } from 'react';

export function Home() {
    const [excursions, setExcursions] = useState<tpExcursion[]>([]);

    useEffect(() => {
        // axios.get<RecivedExcursions>('http://localhost:5000/excursions')
        //     .then(response => {
        //         setExcursions(response.data.$values);
        //     })
        //     .catch(error => console.error('Error fetching data: ', error));
    }, []);

    return (
        <>
            <div className="main-section">
                <DarkPicture/>
                <Header/>
                <Navbar/>

                <div className="main-content2">
                    <h1>Una experiencia inolvidable</h1>
                </div>
            </div>
        </>
    );
}
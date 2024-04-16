import { DarkPicture } from "../../components/DarkPicture/Dark";
import { Header } from "../../components/Header/Header";
import { tpHotelDeals } from "../../types/types";
import { useEffect, useState } from "react";
import './styles.css';
import { Filter } from "../../components/Search/FilterHotelDeals";
import HotelDealCard from "../../components/HotelDeals/Card";
import axios from 'axios';


export function HotelDeals() {

    const [hotelDeals,setHotelDeals] = useState<tpHotelDeals[]>([]);

    useEffect(() => {
        // Recibir las excursiones del servidor
        const fetchHotelDeals = async () => {
            try {
                const response = await axios.get<tpHotelDeals[]>('http://localhost:5000/hoteldeals');

                setHotelDeals(response.data)
                
            } catch (error) {
                console.error('Error fetching hotelDeals:', error);
            }
        };

        fetchHotelDeals();
    }, []);


    return (
        <>
            <div className="hotelDeals-main">
                <DarkPicture/>
                <Header/>
                <h1 id="hotelDeal-title">Ofertas de Hotel</h1>
                <Filter setHotelDeals={setHotelDeals}/>
            </div>

            <div className="hotelDeal-section">
                <div className="hotelDeal-container">
                    {hotelDeals.map((hotelDeal, index) => (
                        <div key={index} className="item">
                            <HotelDealCard {...hotelDeal}/>
                        </div>
                    ))}
                </div>
                
            </div>
        </>
    )
}
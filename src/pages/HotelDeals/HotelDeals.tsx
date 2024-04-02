import { DarkPicture } from "../../components/DarkPicture/Dark";
import { Header } from "../../components/Header/Header";
import { tpHotelDeals } from "../../types/types";
import { useEffect, useState } from "react";
import './styles.css';
import { Filter } from "../../components/Search/FilterHotelDeals";
import HotelDealCard from "../../components/HotelDeals/Card";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


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

    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMzhmNmNhZi0yNjFhLTQwNWMtOTFhZi0zOWFkYjA5NGMwMjIiLCJnaXZlbl9uYW1lIjoiTWFya2V0aW5nMSIsImZhbWlseV9uYW1lIjoiYWdlbnQxIiwicm9sZSI6Ik1hcmtldGluZyBBZ2VudCIsImFnZW5jeUlkIjoiNmUxYzk5MjctZjZhZi1kZWI2LTY2Y2YtMGY1YzRmODllMDUwIiwiZW1haWwiOiJtYXJrZXRpbmdAeW8xIiwiUGVybWlzc2lvbnMiOlsiV3JpdGVVc2VycyJdLCJqdGkiOiJlZDhkYjg2MC0xNjVmLTQ2ZDUtOWFhNi1lZjNmNGZjMWM2YTUiLCJleHAiOjE3MTIwMTQ2NDUsImlzcyI6IlRyYXZlbEFnZW5jeSIsImF1ZCI6IlRyYXZlbEFnZW5jeSJ9.0KJ6hl9sgn5YrYT8n88RB9_fXYvGahMtGEY-hPLwQr0'

    // // Decodificar el token
    // const decodedToken = jwtDecode(token);

    // console.log(decodedToken);

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
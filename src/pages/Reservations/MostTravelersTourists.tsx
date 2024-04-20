import { useEffect, useState } from "react";
import { DashboardStyle } from "../../components/DashboardStyle/DashboardStyle";
import './styles.css'
import { Users } from "../../components/Users/Users";
import { tpToken } from "../../types/typesComponents";
import { jwtDecode } from "jwt-decode";
import { tpMostTravelersTourists } from "../../types/types";
import axios from "axios";
import { url } from "../../helper/server";
import { Statistics } from "../../components/Statistics/Statistics";

export const MostTravelersTourists = () => {

    const [decodeToken, setDecodeToken] = useState<tpToken | null>(null);
    const [stats, setStats] = useState<tpMostTravelersTourists>();
    
    const token = localStorage.getItem('userToken');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const fetchstats = async () => {
        const response = await axios.get<tpMostTravelersTourists>(`${url}/statistics`, config);
        setStats(response.data)
        console.log(response.data)
    }

    useEffect(() => {

        const token = localStorage.getItem('userToken');
        console.log(token);

        if (token) {
            setDecodeToken(jwtDecode(token));
        }
        else {
            setDecodeToken(null)
        }

        fetchstats();
    }, []);

    return (
        <>
            {decodeToken && (decodeToken.role === 'Super Admin') &&
                <Statistics>
                    <div className="container mt-5">
                        <div className="d-flex flex-column justify-content-around align-items-center mb-3">
                            <h1>Turistas más viajadores</h1>
                            <div className="d-flex mt-3 w-100 justify-content-between">
                                <h4>Reservaciones totales encontradas: {stats?.totalReservationFound}</h4>
                                <h4>Over price Count: {stats?.overPricePackagesCount}</h4>
                            </div>
                        </div>
                        <ul className="list-group mt-3">
                            {stats?.mostTravelersTourists.map((tourist, index) => (
                                <li key={index} className="list-group-item d-flex  align-items-center">
                                    <div>
                                        <h5 className="mb-1">{tourist.firstName + tourist.lastName}</h5>
                                        <small>{tourist.touristID}</small>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Statistics>
            }
        </>
    )
}
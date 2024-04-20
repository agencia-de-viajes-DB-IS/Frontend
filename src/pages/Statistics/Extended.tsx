import { useEffect, useState } from "react";
import './styles.css'
import { tpToken } from "../../types/typesComponents";
import { jwtDecode } from "jwt-decode";
import { tpExtendedStats } from "../../types/types";
import axios from "axios";
import { url } from "../../helper/server";
import { Statistics } from "../../components/Statistics/Statistics";

export const Extended = () => {

    const [decodeToken, setDecodeToken] = useState<tpToken | null>(null);
    const [stats, setStats] = useState<tpExtendedStats[]>([]);
    
    const token = localStorage.getItem('userToken');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const fetchstats = async () => {
        const response = await axios.get<tpExtendedStats[]>(`${url}/statistics/extended`, config);
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
                        <div className="d-flex justify-content-around align-items-center mb-3">
                            <h1>Excursiones extendidas</h1>
                        </div>
                        <ul className="list-group mt-3 ms-5 me-5">
                            {stats.map((item, index) => (
                                <li key={index} className="list-group-item d-flex align-items-center justify-content-center">
                                    <div className="d-flex align-items-center justify-content-between w-100">
                                        <h5 className="mb-1">{item.location}</h5>
                                        <small><strong>Salida:</strong> {item.arrivalTime}   <strong>Duración:</strong> {item.duration}</small>
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
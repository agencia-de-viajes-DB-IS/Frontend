import { useEffect, useState } from "react";
import './styles.css'
import { tpToken } from "../../types/typesComponents";
import { jwtDecode } from "jwt-decode";
import { tpHotelsInPackages } from "../../types/types";
import axios from "axios";
import { url } from "../../helper/server";
import { Statistics } from "../../components/Statistics/Statistics";

export const HotelsInPackages = () => {

    const [decodeToken, setDecodeToken] = useState<tpToken | null>(null);
    const [stats, setStats] = useState<tpHotelsInPackages[]>([]);
    
    const token = localStorage.getItem('userToken');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const fetchstats = async () => {
        const response = await axios.get<tpHotelsInPackages[]>(`${url}/statistics/HotelsInPackages`, config);
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
                            <h1>Hoteles en paquetes</h1>
                        </div>
                        <ul className="list-group mt-3 ms-5 me-5">
                            {stats.map((item, index) => (
                                <li key={index} className="list-group-item d-flex align-items-center justify-content-center">
                                    <div className="d-flex align-items-center justify-content-between w-100">
                                        <div>
                                            <h5 className="mb-1">{item.name}</h5>
                                            <small>{item.address}</small>
                                        </div>
                                        <small>{item.category} estrellas</small>
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
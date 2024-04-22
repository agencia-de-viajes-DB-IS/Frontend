import { useEffect, useState } from "react";
import { DashboardStyle } from "../../components/DashboardStyle/DashboardStyle";
import './styles.css'
import { tpToken } from "../../types/typesComponents";
import { jwtDecode } from "jwt-decode";
import { tpMostTravelerTourist } from "../../types/types";
import axios from "axios";
import { url } from "../../helper/server";
import { Statistics } from "../../components/Statistics/Statistics";
import html2pdf from 'html2pdf.js';


export const MostTravelersTourists = () => {

    const [decodeToken, setDecodeToken] = useState<tpToken | null>(null);
    const [stats, setStats] = useState<tpMostTravelerTourist[]>();

    const token = localStorage.getItem('userToken');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const fetchstats = async () => {
        const response = await axios.get<tpMostTravelerTourist[]>(`${url}/statistics/recurrentTravelers`, config);
        const sortedData = response.data.sort((a, b) => b.count - a.count);
        setStats(sortedData);
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

    const exportPDF = () => {
        const opt = {
            margin: 1,
            filename: 'elemento.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };

        html2pdf().from(document.getElementById('pdf-content')).set(opt).save();
    }

    return (
        <>
            {decodeToken && (decodeToken.role === 'Super Admin') &&
                <Statistics>
                    <div className="d-flex justify-content-end mt-5">
                        <button className="btn btn-danger" onClick={exportPDF}>Exportar a PDF</button>
                    </div>
                    <div className="container mt-3" id="pdf-content">
                        <div className="d-flex flex-column justify-content-around align-items-center mb-3">
                            <h1>Turistas más viajadores</h1>
                            <div className="d-flex mt-3 w-100 justify-content-between">
                                <h4>Reservaciones totales encontradas: {stats?.length}</h4>
                            </div>
                        </div>
                        <ul className="list-group mt-3">
                            {stats?.map((tourist, index) => (
                                <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                                    <div>
                                        <h5 className="mb-1">{tourist.firstName + ' ' + tourist.lastName}</h5>
                                        <small>{tourist.ci}</small>
                                    </div>
                                    <div>
                                        <small>{tourist.count}</small>
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
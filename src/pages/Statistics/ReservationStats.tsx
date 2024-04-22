import { useEffect, useState } from "react";
import './styles.css'
import { tpToken } from "../../types/typesComponents";
import { jwtDecode } from "jwt-decode";
import { tpReservationStats } from "../../types/types";
import axios from "axios";
import { url } from "../../helper/server";
import { Statistics } from "../../components/Statistics/Statistics";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { Tooltip, Legend } from 'recharts';
import html2pdf from 'html2pdf.js';


export const ReservationStats = () => {

    const [decodeToken, setDecodeToken] = useState<tpToken | null>(null);
    const [stats, setStats] = useState<tpReservationStats[]>([]);

    const token = localStorage.getItem('userToken');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const fetchstats = async () => {
        const response = await axios.get<tpReservationStats[]>(`${url}/statistics/ReservationStats`, config);
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

    // Reservaciones de paquetes
    const stats1 = stats.map(e => ({agency:e.name, number:e.pckReserv}))

    // Reservaciones de excursiones
    const stats2 = stats.map(e => ({agency:e.name, number:e.excReserv}))

    // Suma de los precios
    const stats3 = stats.map(e => ({agency:e.name, number:e.totalAmount}))

    const data = [
        { name: 'Manzanas', value: 30 },
        { name: 'Plátanos', value: 20 },
        { name: 'Naranjas', value: 15 },
        { name: 'Zapotes', value: 50 }
    ];

    console.log('stats1')
    console.log(stats1)

    const checkEmpty = (arr:{agency:string,number:number}[]) => {
        if (arr.map(e => e.number).every(e => e == 0)) {
            return true
        }

        return false
    }

    return (
        <>
            {decodeToken && (decodeToken.role === 'Super Admin') &&
                <Statistics>
                    <div className="d-flex justify-content-end mt-5">
                        <button className="btn btn-danger" onClick={exportPDF}>Exportar a PDF</button>
                    </div>
                    <div className="container mt-3" id="pdf-content">
                        <div className="d-flex justify-content-around align-items-center mb-3">
                            <h1>Reservaciones</h1>
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            <h3>Reservaciones de paquetes por agencia</h3>
                            {checkEmpty(stats1) ? <p className="mt-5 mb-5">No hay datos</p> : 
                            <PieChart width={900} height={400}>
                            <Pie
                                data={stats1.filter(e => e.number > 0)}
                                dataKey="number"
                                nameKey="agency"
                                cx={200}
                                cy={200}
                                outerRadius={80}
                                fill="#8884d8"
                                label={({ agency, number }) => `${agency}: ${number}`}
                            >
                                {stats1.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`#${index * 3333}`} />
                                ))}
                            </Pie>
                        </PieChart>}
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            <h3>Reservaciones de excursiones por agencia</h3>
                            <PieChart width={900} height={400}>
                                <Pie
                                    data={stats2.filter(e => e.number > 0)}
                                    dataKey="number"
                                    nameKey="agency"
                                    cx={200}
                                    cy={200}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label={({ agency, number }) => `${agency}: ${number}`}
                                >
                                    {stats2.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`#${index * 3333}`} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            <h3>Suma de los precios de las reservas</h3>
                            <BarChart width={900} height={500} data={stats3}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="agency" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="number" fill="#8884d8" />
                            </BarChart>
                        </div>
                    </div>
                </Statistics>
            }
        </>
    )
}
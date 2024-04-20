import { useEffect, useState } from "react";
import './styles.css'
import { tpToken } from "../../types/typesComponents";
import { jwtDecode } from "jwt-decode";
import { tpReservationStats } from "../../types/types";
import axios from "axios";
import { url } from "../../helper/server";
import { Statistics } from "../../components/Statistics/Statistics";
// import { VictoryBar, VictoryChart } from 'victory';

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

    const reservacionesPack = [
        { name: "Paseo del Prado", count: 5 },
        { name: "Paseo del Prado1", count: 2 },
        { name: "Paseo del Prado2", count: 0 },
        { name: "Paseo del Prado3", count: 10 },
        { name: "Paseo del Prado4", count: 9 },
    ]

    const data = reservacionesPack.map(e => { x: e.name; y: e.count; })

    return (
        <>
            {decodeToken && (decodeToken.role === 'Super Admin') &&
                <Statistics>
                    <div className="container mt-5">
                        <div className="d-flex justify-content-around align-items-center mb-3">
                            <h1>Reservaciones</h1>
                        </div>
                        {/* <VictoryChart>
                            <VictoryBar data={data} />
                        </VictoryChart> */}
                    </div>
                </Statistics>
            }
        </>
    )
}
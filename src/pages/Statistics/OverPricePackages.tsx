import { useEffect, useState } from "react";
import './styles.css'
import { tpToken } from "../../types/typesComponents";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { url } from "../../helper/server";
import { Statistics } from "../../components/Statistics/Statistics";
import html2pdf from 'html2pdf.js';

export const OverPricePackages = () => {

    const [decodeToken, setDecodeToken] = useState<tpToken | null>(null);
    const [stats, setStats] = useState<{count:number}>();
    
    const token = localStorage.getItem('userToken');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const fetchstats = async () => {
        const response = await axios.get<{count:number}>(`${url}/statistics/overPricePackagesCount`, config);
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

    return (
        <>
            {decodeToken && (decodeToken.role === 'Super Admin') &&
                <Statistics>
                    <div className="d-flex justify-content-end mt-5">
                        <button className="btn btn-danger" onClick={exportPDF}>Exportar a PDF</button>
                    </div>
                    <div className="container mt-3" id="pdf-content">
                        <div className="d-flex justify-content-around align-items-center mb-3">
                            <h1>Cantidad de Paquetes con precios mayores que la media</h1>
                            <h1>{stats?.count}</h1>
                        </div>
                        
                    </div>
                </Statistics>
            }
        </>
    )
}
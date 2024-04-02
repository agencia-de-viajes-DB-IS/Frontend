import { useEffect, useState } from "react";
import { DashboardStyle } from "../../components/DashboardStyle/DashboardStyle"; 
import { tpUser } from "../../types/types";
import './styles.css'
import { url } from "../../helper/server";
import axios from "axios";
import { Users } from "../../components/Users/Users";
import { tpToken } from "../../types/typesComponents";
import { jwtDecode } from "jwt-decode";

export const Admin = () => {

    const [decodeToken, setDecodeToken] = useState<tpToken | null>(null);

    useEffect(() => {

        const token = localStorage.getItem('userToken');
        console.log(token);
        
        if (token) {
            setDecodeToken(jwtDecode(token));
        }
        else {
            setDecodeToken(null)
        }
        
    }, []);

    return (
        <>
            {decodeToken && (decodeToken.role === 'Super Admin' || decodeToken.role === 'Marketing Agent') &&
                <DashboardStyle>
                    <Users/> 
                </DashboardStyle>
            }
        </>
    )
}
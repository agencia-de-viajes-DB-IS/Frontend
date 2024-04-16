import { useEffect, useState } from "react";
import { DashboardStyle } from "../../components/DashboardStyle/DashboardStyle";
import './styles.css'
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
            {decodeToken && (decodeToken.role === 'Super Admin') &&
                <DashboardStyle>
                    <Users/> 
                </DashboardStyle>
            }
        </>
    )
}
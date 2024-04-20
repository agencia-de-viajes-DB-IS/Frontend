import { useEffect, useState } from 'react';
import './styles.css'
import { jwtDecode } from 'jwt-decode';
import { tpToken } from '../../types/typesComponents';

interface NavbarProps {
    LoggedUser: boolean
}


export function Navbar({ LoggedUser }:NavbarProps) {

    const [decodeToken, setDecodeToken] = useState<tpToken | null>(null);
    
    useEffect(() => {
        let token = localStorage.getItem('userToken');
        
        if (token) {
            setDecodeToken(jwtDecode(token));
        }
        else {
            setDecodeToken(null)
        }
    }, [LoggedUser]);

    return (
        <>
            <div className="mainmenu">
                <ul className='mainmenu-items'>
                    <li>
                        <a href="/">Inicio</a>
                    </li>
                    <li>
                        <a href="/agencies">Agencias</a>
                    </li>
                    <li>
                        <a href="/excursions">Excursiones</a>
                    </li>
                    <li>
                        <a href="/hoteldeals">Ofertas de Hotel</a>
                    </li>
                    <li>
                        <a href="/packages">Paquetes</a>
                    </li>
                    {decodeToken && decodeToken.role === 'Super Admin' && 
                        <>
                            <li>
                                <a href="/admin">Administración</a>
                            </li>
                            <li>
                                <a href="/statistics">Estadísticas</a>
                            </li>
                        </>
                    }
                    {decodeToken && decodeToken.role === 'Marketing Agent' && 
                        <li>
                            <a href="/admin-excursions">Administración</a>
                        </li>
                    }
                    {decodeToken && 
                        <>
                            <li>
                                <a href="/my-tourist">Mis turistas</a>
                            </li>
                            <li>
                                <a href="/reservations-excursions">Mis reservas</a>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </>
    )
}
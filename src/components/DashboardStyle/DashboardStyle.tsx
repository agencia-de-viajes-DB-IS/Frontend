import { Link } from 'react-router-dom'
import { DashboardProps, tpToken } from '../../types/typesComponents'
import './styles.css'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'

export const DashboardStyle: React.FC<DashboardProps> = ({ children }) => {

    const [decodedToken, setDecodedToken] = useState<tpToken | null>({
        role: "",
        sub:""
    })

    

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setDecodedToken(jwtDecode(token))
        }
    },[]);

    return (
        <>
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Aero Skull</a>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <Link to={"/"}>
                        <a className="nav-link px-3" href="#">Salir</a>
                    </Link>
                </div>
            </div>
        </header>
        <div className="container-fluid h-100">
                <div className="row h-100">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse h-100">
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                { decodedToken && decodedToken.role === 'Super Admin' &&
                                    <>
                                        <li className="nav-item">
                                            <Link to={"/admin"}>
                                                <a className="nav-link active" aria-current="page" href="#">
                                                    <span data-feather="home"></span>
                                                    Usuarios
                                                </a>
                                            </Link>
                                        </li>
                                    
                                        <li className="nav-item">
                                            <Link to={"/admin-agencies"}>
                                                <a className="nav-link active" aria-current="page" href="#">
                                                    <span data-feather="home"></span>
                                                    Agencias
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/admin-hotels"}>
                                                <a className="nav-link active" aria-current="page" href="#">
                                                    <span data-feather="home"></span>
                                                    Hoteles
                                                </a>
                                            </Link>
                                        </li>
                                    </>
                                }
                                { decodedToken && decodedToken.role === "Marketing Agent" &&
                                    <>
                                        <li className="nav-item">
                                            <Link to={"/admin-hotelDeals"}>
                                                <a className="nav-link active" aria-current="page" href="#">
                                                    <span data-feather="home"></span>
                                                    Ofertas de Hotel
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/admin-excursions"}>
                                                <a className="nav-link active" aria-current="page" href="#">
                                                    <span data-feather="home"></span>
                                                    Excursiones
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/admin-extendedexcursions"}>
                                                <a className="nav-link active" aria-current="page" href="#">
                                                    <span data-feather="home"></span>
                                                    Excursiones Extendidas
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/admin-packages"}>
                                                <a className="nav-link active" aria-current="page" href="#">
                                                    <span data-feather="home"></span>
                                                    Paquetes
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                <span data-feather="file"></span>
                                                Peticiones
                                            </a>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {children}
                    </main>
                </div>
            </div></>
    )
}
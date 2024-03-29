import { Link } from 'react-router-dom'
import { DashboardProps } from '../../types/typesComponents'
import './styles.css'

export const DashboardStyle: React.FC<DashboardProps> = ({ children }) => {
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
        <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link to={"/admin"}>
                                        <a className="nav-link active" aria-current="page" href="#">
                                            <span data-feather="home"></span>
                                            Usuarios
                                        </a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/admin-agencias"}>
                                        <a className="nav-link active" aria-current="page" href="#">
                                            <span data-feather="home"></span>
                                            Agencias
                                        </a>
                                    </Link>
                                    
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <span data-feather="file"></span>
                                        Peticiones
                                    </a>
                                </li>
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
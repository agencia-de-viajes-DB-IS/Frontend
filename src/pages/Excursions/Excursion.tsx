import { DarkPicture } from "../../components/DarkPicture/Dark";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import './styles.css'
import { Card } from "../../components/Card/Card";


export function Excursions() {

    const cards = Array.from({ length:  40 }, () => null);

    return (
        <>
            <div className="excursion-main">
                <DarkPicture/>
                <Header/>
                <Navbar/>

                <div className="excursion-section">
                    <div className="search-section">
                        <div className="search-from">
                            <label htmlFor="">Desde</label>
                            <input type="text" placeholder="Escribe aquí ..."/>
                        </div>
                        <div className="search-to">
                            <label htmlFor="">Hasta</label>
                            <input type="text" placeholder="Escribe aquí ..."/>
                        </div>
                        <div className="search-to">
                            <label htmlFor="">Precio Mínimo</label>
                            <input type="text" placeholder="Escribe aquí ..."/>
                        </div>
                        <div className="search-to">
                            <label htmlFor="">Precio Máximo</label>
                            <input type="text" placeholder="Escribe aquí ..."/>
                        </div>
                        <div className="search-btn">
                            <button type="button" onClick={alert}>Buscar</button>
                        </div>
                    </div>

                    <div className="excursion-container">
                        {cards.map((_, index) => (
                            <div key={index} className="item">
                                <Card/>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
        </>
    )
}
import { DarkPicture } from "../../components/DarkPicture/Dark";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import './styles.css'
import { Card } from "../../components/Card/Card";
import { Filter } from "../../components/Search/FilterExcursions";


export function Excursions() {

    const cards = Array.from({ length:  15 }, () => null);

    return (
        <>
            <div className="excursions-main">
                <DarkPicture/>
                <Header/>
                <Navbar/>

                <h1 id="excursion-title">Excursiones</h1>

                <Filter/>
            </div>

            <div className="excursion-section">
                <div className="excursion-container">
                    {cards.map((_, index) => (
                        <div key={index} className="item">
                            <Card/>
                        </div>
                    ))}
                </div>
                
            </div>
        </>
    )
}
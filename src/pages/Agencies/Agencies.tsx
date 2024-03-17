import './styles.css'

import { DarkPicture } from "../../components/DarkPicture/Dark";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import './styles.css'
import { Card } from "../../components/Card/Card";
import { Filter } from '../../components/Search/FilterAgencies';


export function Agencies() {

    const cards = Array.from({ length:  15 }, () => null);

    return (
        <>
            <div className="agencies-main">
                <DarkPicture/>
                <Header/>
                <Navbar/>

                <h1 id="agency-title">Agencias</h1>

                <Filter/>
            </div>

            <div className="agency-section">
                <div className="agency-container">
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
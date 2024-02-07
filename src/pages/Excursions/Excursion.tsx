import { DarkPicture } from "../../components/DarkPicture/Dark";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import './styles.css'
import { Card } from "../../components/Card/Card";
import { Searchbar } from "../../components/Search/Searchbar";


export function Excursions() {

    const cards = Array.from({ length:  40 }, () => null);

    return (
        <>
            <div className="excursion-main">
                <DarkPicture/>
                <Header/>
                <Navbar/>

                <div className="excursion-section">
                    <Searchbar/>

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
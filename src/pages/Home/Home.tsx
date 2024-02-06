import { DarkPicture } from "../../components/DarkPicture/Dark";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import './styles.css'


export function Home() {
    return (
        <>
            <div className="main-section">
                <DarkPicture/>
                <Header/>
                <Navbar/>

                <div className="main-content2">
                    <h1>Una experiencia inolvidable</h1>
                </div>
            </div>
        </>
    )
}
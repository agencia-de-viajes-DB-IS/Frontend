import './styles.css'

export function Navbar() {

    return (
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
            </ul>
        </div>
    )
}
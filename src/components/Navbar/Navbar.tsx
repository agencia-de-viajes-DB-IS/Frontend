import './styles.css'

export function Navbar() {

    return (
        <div className="mainmenu">
            <ul className='mainmenu-items'>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/excursions">Excursiones</a>
                </li>
                <li>
                    <a href="#">Paquetes</a>
                </li>
            </ul>
        </div>
    )
}
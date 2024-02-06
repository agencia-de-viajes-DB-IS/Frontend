import logo from '../../images/skull2.avif'
import './styles.css'

export function Header() {
    return (
        <div className="header-container">
            <div>
                <img src={logo} alt="logo" width="100px"/>
            </div>

            <div id='title'>
                <h2>Aero Skull</h2>
                <p>The best travel company in the world</p>
            </div>
            
            <div className='user-section'>
                <button type="button" id='btn-singIn'>Registrarse</button>
                <button type="button" id='btn-login'>Iniciar Sesión</button>
            </div>
        </div>
    )
}
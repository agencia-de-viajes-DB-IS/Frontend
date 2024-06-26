import logo from '../../images/skull.png'
import LoginModal from '../Login/LoginModal'
import RegisterModal from '../Register/RegisterModal'
import './styles.css'
import Button from 'react-bootstrap/Button';

export function Header() {

    const loggedUser = true;

    return (
        <div className="header-container">
            <div id='logo'>
                <img src={logo} alt="logo" width="100px"/>
            </div>

            <div id='title'>
                <h2>Aero Skull</h2>
                <p>The best travel company in the world</p>
            </div>
            
            {loggedUser ? 
            <div className='user-section'>
                <Button id='btn-closeSesion' className="text-light" variant="">
                    Cerrar Sesión
                </Button>
            </div>:
            <div className='user-section'>
                <RegisterModal/>
                <LoginModal/>
            </div>}
            
        </div>
    )
}
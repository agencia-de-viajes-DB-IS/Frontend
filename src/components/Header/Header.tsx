import logo from '../../images/skull.png'
import LoginModal from '../Login/LoginModal'
import RegisterModal from '../Register/RegisterModal'
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
                <RegisterModal/>
                <LoginModal/>
            </div>
        </div>
    )
}
import { useEffect, useState } from 'react';
import logo from '../../images/skull.png'
import LoginModal from '../Login/LoginModal'
import RegisterModal from '../Register/RegisterModal'
import './styles.css'
import Button from 'react-bootstrap/Button';
import { Navbar } from '../Navbar/Navbar';

export function Header() {

    const [loggedUser,setLoggedUser] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setLoggedUser(true);
        }
    }, [localStorage.getItem('userToken')]);

    const closeSesion = () => {
        localStorage.removeItem('userToken');
        setLoggedUser(false);
    }

    return (
        <>
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
                    <Button id='btn-closeSesion' className="text-light" variant="" onClick={closeSesion}>
                        Cerrar Sesión
                    </Button>
                </div>:
                <div className='user-section'>
                    <RegisterModal/>
                    <LoginModal setLoggedUser={setLoggedUser}/>
                </div>}
            </div>

            <Navbar LoggedUser={loggedUser}/>
        </>
    )
}
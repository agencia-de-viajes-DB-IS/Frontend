import './styles.css'
import img from '../../images/office.jpg'
import { useState } from 'react'

export function Card() {

    const [reserved, setReserved] = useState(false);

    const changeBtn = () => {
        setReserved(!reserved);
    }

    const btnclass = reserved ? 'reserved' : 'unreserved'
    const btntext = reserved ? 'Cancelar' : 'Reservar'

    return (
        <>
        <div className="card-client">
            <div className="user-picture">
                <img src={img} alt="foto"/>
            </div>
            <p className="title-item">Lorem ipsun bla bla bla</p>
            <div className="btn-reserv">
                <button className={btnclass} onClick={changeBtn}>{btntext}</button>
            </div>
        </div>
    </>
    )
}
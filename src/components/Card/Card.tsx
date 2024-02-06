import './styles.css'
import img from '../../images/roca.jpg'

export function Card() {
    return (
        <>
        <div className="card-client">
            <div className="user-picture">
                <img src={img} alt="foto"/>
            </div>
            <p className="title-item"> Agárrate a la roca</p>
            <div className="btn-reserv">
                <button>Reservar</button>
            </div>
        </div>
    </>
    )
}
import { UsersProps } from '../../files/types'
import './styles.css'

export const Users: React.FC<UsersProps> = ({data}) => {
    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <h3>Usuarios</h3>
                </div>
                <ul className="list-group">
                    {data.map((user, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{user.firstName}</h5>
                                <small>{user.email}</small>
                            </div>
                            <div>
                                <button type="button" className="btn btn-primary me-2">Editar</button>
                                <button type="button" className="btn btn-danger">Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
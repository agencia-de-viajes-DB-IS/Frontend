import { tpUser} from '../../types/types'
import UserForm from './UserFormAdd'
import UserModalAdd from './UserModalAdd'
import UserModalUpdate from './UserModalUdpate'
import './styles.css'

interface UserAdminProps {
    data:tpUser[];
}

export function Users({ data }:UserAdminProps) {
    console.log(data)
    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <h1>Usuarios</h1>
                </div>
                <UserModalAdd/>
                <ul className="list-group mt-3">
                    {data && data.map((user, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{user.firstName}</h5>
                                <small>{user.email}</small>
                            </div>
                            <div>
                                <UserModalUpdate user={user}/>
                                <button type="button" className="btn btn-danger">Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
import { tpUser} from '../../types/types'
import UserModalAdd from './UserModalAdd'
import UserModalUpdate from './UserModalUdpate'
import './styles.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { url } from '../../helper/server'

export function Users() {

    const [users, setUsers] = useState<tpUser[]>([]);

    const token = localStorage.getItem('userToken');
    console.log(token);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const fetchUsers = async () => {
        const user = await axios.get<tpUser[]>(`${url}/users`, config);
        setUsers(user.data)
    }

    const handleDelete = async (id: string) => {

        const data = {
            userId : id
        }

        try {
            await axios.delete(`${url}/users`, {...config, data})
            // Recargar la lista de usuarios después de eliminar uno
            fetchUsers();
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);
    
    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-around align-items-center mb-3">
                    <h1>Usuarios</h1>
                </div>
                <UserModalAdd fetchUsers={fetchUsers}/>
                <ul className="list-group mt-3">
                    {users.map((user, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{user.firstName}</h5>
                                <small>{user.email}</small>
                            </div>
                            <div>
                                <UserModalUpdate user={user} fetchUsers={fetchUsers}/>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(user.id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
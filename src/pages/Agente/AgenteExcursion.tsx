import { useEffect, useState } from "react";
import './styles.css' 
import { DashboardAgente } from "./DashboardAgente";
 

export const AgenteExcursion = () => {
    // const [users, setUsers] = useState<UsersGet[]>([])
    // const users: tpUser[] = [
    //     { firstName: "John", lastName: "Doe", email: "john.doe@example.com", password: "password1" },
    //     { firstName: "Jane", lastName: "Doe", email: "jane.doe@example.com", password: "password2" },
    //     { firstName: "Alice", lastName: "Smith", email: "alice.smith@example.com", password: "password3" },
    //     { firstName: "Bob", lastName: "Johnson", email: "bob.johnson@example.com", password: "password4" },
    //     { firstName: "Charlie", lastName: "Brown", email: "charlie.brown@example.com", password: "password5" },
    // ];

    useEffect(() => {
        const api = async () => {
            const user = await axios.get<UsersGet>(`${url}/users`);
             
        }
        api();
    }, []);

    return (
        <>
            <DashboardAgente>
                d
            </DashboardAgente>
        </>
    )
}
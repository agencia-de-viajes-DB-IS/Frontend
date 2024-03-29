import { useEffect, useState } from "react";
import { DashboardStyle } from "../../components/DashboardStyle/DashboardStyle"; 
import { UsersGet, tpUser } from "../../types/types";
import './styles.css'
import { url } from "../../helper/server";
import axios from "axios";
import { Users } from "../../components/Users/Users";
import { Agencies } from "../../components/Agencies/Agencies";

interface data {
    $id: string,
    $values: UsersGet[]
}

export const Admin = () => {
    const [ option, setOption ] = useState(1)
    // const [users, setUsers] = useState<UsersGet[]>([])
    const users: tpUser[] = [
        { firstName: "John", lastName: "Doe", email: "john.doe@example.com", password: "password1" },
        { firstName: "Jane", lastName: "Doe", email: "jane.doe@example.com", password: "password2" },
        { firstName: "Alice", lastName: "Smith", email: "alice.smith@example.com", password: "password3" },
        { firstName: "Bob", lastName: "Johnson", email: "bob.johnson@example.com", password: "password4" },
        { firstName: "Charlie", lastName: "Brown", email: "charlie.brown@example.com", password: "password5" },
    ];

    // useEffect(() => {
    //     const api = async () => {
    //         const user = await axios.get<UsersGet>(`${url}/users`);
    //         setUsers(user.data.$values)
    //         const s = await fetch(`${url}/users`, {
    //             method: "GET"
    //         })
    //         const a = await s.json()
    //         console.log(a)
    //     }
    //     api();
    // }, []);

    return (
        <>
            <DashboardStyle>
                <Users data={users}/> 
            </DashboardStyle>
        </>
    )
}
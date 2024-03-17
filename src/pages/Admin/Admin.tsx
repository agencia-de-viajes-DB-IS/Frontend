import { useEffect } from "react";
import { DashboardStyle } from "../../components/DashboardStyle/DashboardStyle"; 
import { UsersGet, tpUser } from "../../files/types";
import './styles.css'
import { url } from "../../helper/server";
import axios from "axios";
import { Users } from "../../components/Users/Users";

interface data {
    $id: string,
    $values: UsersGet[]
}

export function Admin() {
    const users: tpUser[] = [
        { firstName: "John", lastName: "Doe", email: "john.doe@example.com", password: "password1" },
        { firstName: "Jane", lastName: "Doe", email: "jane.doe@example.com", password: "password2" },
        { firstName: "Alice", lastName: "Smith", email: "alice.smith@example.com", password: "password3" },
        { firstName: "Bob", lastName: "Johnson", email: "bob.johnson@example.com", password: "password4" },
        { firstName: "Charlie", lastName: "Brown", email: "charlie.brown@example.com", password: "password5" },
    ];

    useEffect(() => {
        const api = async () => {
            const users = await axios.get<data[]>(`${url}/auth/register`);
            console.log(users)
        }
        api();
    }, []);

    return (
        <>
            <DashboardStyle>
                <Users data={users}/>
            </DashboardStyle>
        </>
    )
}
import { useState } from "react";
import { url } from "../../helper/server";
import axios from "axios";
import { Login } from "../../types/types";

interface LoginFormProp {
    setLoggedUser: (arg0:boolean) => void;
    onClose: () => void; // Esta función se utilizará para cerrar el modal
}

export function LoginForm({ onClose , setLoggedUser }:LoginFormProp) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post<Login>(`${url}/auth/login`, data);
            
            if(response.status == 200) {
                
                // Guarda el token en el localStorage
                localStorage.setItem('userToken', response.data.token);
                console.log(localStorage.getItem('userToken'));
                setLoggedUser(true);
                onClose();
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="input-group form-group">
                    <input
                        type="text" 
                        className="form-control mb-3 border border-secondary" 
                        placeholder="Email"
                        name="Email"
                        value={email}
                        onChange={({target}) => setEmail(target.value)}
                    /> 
                </div>
                <div className="input-group form-group">
                    <input 
                        type="password" 
                        className="form-control mb-3 border border-secondary" 
                        placeholder="Password"
                        name="Password"
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <div className="form-group d-flex flex-column align-items-center">
                    <input type="submit" value="Login" className="btn btn-dark login_btn"/>
                </div>
            </form>
        </>
    )
}

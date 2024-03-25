import { useState } from "react";
import { url } from "../../helper/server";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Login } from "../../types/types";
import { ModalShowProps } from "../../types/typesComponents";

export function LoginForm({ onClose }:ModalShowProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post<Login>(`${url}/auth/login`, data);
            console.log(response);
            if(response.status == 200) {
                // Guarda el token en el localStorage
                localStorage.setItem('userToken', response.data.token);
                navigate("/");
                onClose();
                alert(`Bienvenido`);
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

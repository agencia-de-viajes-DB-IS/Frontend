import { useState } from "react";
import { url } from "../../helper/server";
import axios from "axios";
import { Register } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { ModalShowProps } from "../../types/typesComponents";



function RegisterForm({ onClose }: ModalShowProps) {

    // Datos del registro del usuario
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    
    // Manejar el enviar los datos de registro del usuario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        const user = await axios.post<Register>(`${url}/auth/register`, data);
        if(user.status == 200) {
            navigate("/");
            onClose();
            alert(`Hola ${firstName}, usted ha sido registrado`);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="input-group form-group">
                    <input
                        type="text" 
                        className="form-control mb-3 border border-secondary" 
                        placeholder="Nombre"
                        name="firstName"
                        value={firstName}
                        onChange={({target}) => setFirstName(target.value)}
                    /> 
                </div>
                <div className="input-group form-group">
                    <input
                        type="text" 
                        className="form-control mb-3 border border-secondary" 
                        placeholder="Apellidos"
                        name="lastName"
                        value={lastName}
                        onChange={({target}) => setLastName(target.value)}
                    /> 
                </div>
                <div className="input-group form-group">
                    <input
                        type="text" 
                        className="form-control mb-3 border border-secondary" 
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={({target}) => setEmail(target.value)}
                    /> 
                </div>
                <div className="input-group form-group">
                    <input 
                        type="password" 
                        className="form-control mb-3 border border-secondary" 
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <div className="form-group d-flex flex-column align-items-center">
                    <input type="submit" value="Register" className="btn btn-dark login_btn"/>
                </div>
            </form>
        </>
    )
}

export default RegisterForm
import { useState } from "react";
import { myFetchPost } from "../../helper/server";


function RegisterForm() {

    // Datos del registro del usuario
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // Manejar el enviar los datos de registro del usuario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            firstName: "Alfredo1",
            lastName: "Somoza1",
            email: "somoza1@gamil.com",
            password: "somozaza"
        }

        myFetchPost("auth/register", data)
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
                    <input type="submit" value="Register" className="btn btn-dark login_btn"/>
                </div>
            </form>
        </>
    )
}

export default RegisterForm
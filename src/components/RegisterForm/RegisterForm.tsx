import FormProps  from "../../files/interfaces"
import { useState } from "react";

const api_login:string = '/api/login'

function RegisterForm({toggle}:FormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const response = await fetch(api_login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                name: name
            })
        });
    
        if (!response.ok) {
            // Handle error
            console.error('Error:', response);
        } else {
            // Handle success
            const data = await response.json();
            console.log('Success:', data);
        }
    };

    return (
        <>
            <div className="container">
                <div className='d-flex justify-content-center'>
                    <div className="head-login d-flex align-items-center m-3">
                        <a href="/" className="nav-link text-light text-center w-100">Volver al sitio</a>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Bienvenido</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group form-group">
                                    <input 
                                        type="text" 
                                        className="form-control mb-3" 
                                        placeholder="Nombre y Apellidos"
                                        name="Name"
                                        value={name}
                                        onChange={({target}) => setName(target.value)}
                                    />
                                </div>
                                <div className="input-group form-group">
                                    <input 
                                        type="text" 
                                        className="form-control mb-3" 
                                        placeholder="Correo electónico"
                                        name="Email"
                                        value={email}
                                        onChange={({target}) => setEmail(target.value)}
                                    />
                                </div>
                                <div className="input-group form-group">
                                    <input
                                        type="text" 
                                        className="form-control mb-3" 
                                        placeholder="Nombre de usuario"
                                        name="Username"
                                        value={username}
                                        onChange={({target}) => setUsername(target.value)}
                                    /> 
                                </div>
                                <div className="input-group form-group">
                                    <input 
                                        type="password" 
                                        className="form-control mb-3" 
                                        placeholder="Contraseña"
                                        name="Password"
                                        value={password}
                                        onChange={({target}) => setPassword(target.value)}
                                    />
                                </div>
                                <div className="form-group d-flex justify-content-center">
                                    <input type="submit" value="Registrarme" className="btn btn-dark login_btn" onClick={toggle}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterForm
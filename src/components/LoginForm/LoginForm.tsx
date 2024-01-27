import FormProps  from "../../files/interfaces"
import { useState } from "react";

const api_login:string = '/api/login'

function LoginForm({toggle}:FormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const response = await fetch(api_login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
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
                                        placeholder="Username"
                                        name="Username"
                                        value={username}
                                        onChange={({target}) => setUsername(target.value)}
                                    /> 
                                </div>
                                <div className="input-group form-group">
                                    <input 
                                        type="password" 
                                        className="form-control mb-3" 
                                        placeholder="Password"
                                        name="Password"
                                        value={password}
                                        onChange={({target}) => setPassword(target.value)}
                                    />
                                </div>
                                <div className="form-group d-flex justify-content-center">
                                    <input type="submit" value="Login" className="btn btn-dark login_btn"/>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Usted no tiene cuenta?<a href="#" onClick={toggle}>Registrarme</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default LoginForm
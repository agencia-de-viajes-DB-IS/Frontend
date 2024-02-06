import { useState } from "react";
import { myuseFetch } from "../../helper/server";
import { tpUser } from "../../files/types";


function RegisterForm() {

    // Datos del registro del usuario
    const [user, setUser] = useState<tpUser>({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    // Administrar las propiedades de un usuario al escribirlas
    const onInputChange = (e:HTMLInputElement) => {
        
    }
    
    // Manejar el enviar los datos de registro del usuario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            firstName: "Alfredo1",
            lastName: "Somoza1",
            email: "somoza1@gamil.com",
            password: "somozaza"
        }

        myuseFetch("auth/register", data, "POST")
    }

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
                                        placeholder="Nombre"
                                        name="fistName"
                                        value={user.firstName}
                                        onChange={({target}) => onInputChange(target)}
                                    />
                                </div>
                                <div className="input-group form-group">
                                    <input 
                                        type="text" 
                                        className="form-control mb-3" 
                                        placeholder="Apellidos"
                                        name="lastName"
                                        value={user.lastName}
                                        onChange={({target}) => onInputChange(target)}
                                    />
                                </div>
                                <div className="input-group form-group">
                                    <input
                                        type="text" 
                                        className="form-control mb-3" 
                                        placeholder="Correo electrónico"
                                        name="email"
                                        value={user.email}
                                        onChange={({target}) => onInputChange(target)}
                                    /> 
                                </div>
                                <div className="input-group form-group">
                                    <input 
                                        type="password" 
                                        className="form-control mb-3" 
                                        placeholder="Contraseña"
                                        name="password"
                                        value={user.password}
                                        onChange={({target}) => onInputChange(target)}
                                    />
                                </div>
                                <div className="form-group d-flex justify-content-center">
                                    <input type="submit" value="Registrarme" className="btn btn-dark login_btn"/>
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
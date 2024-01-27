import { useState } from 'react';
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function Login() {
    const [login, setLogin] = useState(true);

    const toggle = () => {
        setLogin(!login);
    };

    return (
        <>
            <div className='d-flex justify-content-center mt-4'>
                {login ? <LoginForm toggle={toggle}/> : <RegisterForm toggle={toggle}/>}
            </div>
        </>
    );
}

export default Login;
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles.css'
import { tpPackage } from '../../types/types';

function PackageReservModalContent(package1:tpPackage) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nacionality, setNacionality] = useState("");
    const [ci, setCI] = useState("");



    const handleSubmit = () => {

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
                        placeholder="Nacionality"
                        name="nacionality"
                        value={nacionality}
                        onChange={({target}) => setNacionality(target.value)}
                    /> 
                </div>
                <div className="input-group form-group">
                    <input 
                        type="ci" 
                        className="form-control mb-3 border border-secondary" 
                        placeholder="CI"
                        name="ci"
                        value={ci}
                        onChange={({target}) => setCI(target.value)}
                    />
                </div>
                <div className="form-group d-flex flex-column align-items-center">
                    <input type="submit" value="Reservar" className="btn btn-dark login_btn"/>
                </div>
            </form>
        </>
    );
}

export default PackageReservModalContent;
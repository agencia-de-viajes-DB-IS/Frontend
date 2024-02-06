// import Swal from 'sweetalert2';
// import { tpResponse } from '../files/interfaces';

// function mostrarAletra1() {
//     Swal.fire("Succesfull");
// }

// function mostrarAletra(data: tpResponse) {
//     Swal.fire(data.errorMessage);
// }

const urlBase = ""

export const myuseFetch = (endpoint: string, data: object, method: string = 'POST') => {
    return fetch(`${urlBase}/${endpoint}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data;
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    })
};
const urlBase = ""

export const myFetchPost = (endpoint: string, data: object) => {
    return fetch(`${urlBase}/${endpoint}`, {
        method: 'POST',
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
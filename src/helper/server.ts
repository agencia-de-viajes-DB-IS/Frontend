export const url = "http://localhost:5000"

export const fetchDefault = (endpoint: string, init: any, method: string, resolve = (_d: any) => {}, reject = (_d:any)=> {}) => {
    fetch(`${url}${endpoint}`, {
        'method': method,
        'headers': {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(init),
    })
    .then(async (res) => {
        return res.json();
    })
    .then(data => {
        resolve(data);
    })
    .catch(err => { 
        reject(err);
    });
}
export const fetchForm = (endpoint: string, init: FormData, method: string, resolve = (_d: any) => {}, reject = (_d:any)=> {}) => {
    fetch(`${url}${endpoint}`, {
        'method': method, 
        body: init,
    })
    .then(async (res) => {
        return res.json();
    })
    .then(data => {
        resolve(data);
    })
    .catch(err => { 
        reject(err);
    });
}
export const fetchGet = (endpoint: string, resolve = (_d: any) => {}, reject = (_d: any)=> {}) => {
    fetch(`${url}${endpoint}`, {
        'method': "GET",
        'headers': {
            'Content-Type': 'application/json',
        }
    })
    .then(async (res) => {
        return res.json();
    })
    .then(data => {
        resolve(data);
    })
    .catch(err => { 
        reject(err);
    });
}

export const fetchDelete = (endpoint: string, resolve = (_d: any) => {}, reject = (_d: any)=> {}) => {
    fetch(`${url}${endpoint}`, {
        'method': "DELETE",
    })
    .then(async (res) => {
        return res.json();
    })
    .then(data => {
        resolve(data);
    })
    .catch(err => { 
        reject(err);
    });
}

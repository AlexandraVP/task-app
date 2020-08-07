
type Bundle = [string, string, string]

function api(bundle: Bundle, url: string, params?: RequestInit, payload?: any){
    return (dispatch: Function) => {
        dispatch({type: bundle[0]});
        fetch(url, params)
            .then(d => d.json())
            .then(data => {
                dispatch({type:  bundle[1], data, payload});
            })
            .catch(error => {
                dispatch({type: bundle[2], error})
            });
    };
}

export function getRequest(bundle: Bundle, url: string){
    return api(bundle, url);
}

export function postRequest(bundle: Bundle, url: string, body: any, payload?: any) {
    return api(bundle, url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body && JSON.stringify(body)
    },
        payload);
}

export function deleteRequest(bundle: Bundle, url: string, payload?: any) {
    return api(bundle, url, {
        method: 'DELETE'
    }, payload);
}
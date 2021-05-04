import authService from '../api-authorization/AuthorizeService'
import * as Converters from '../common/Converters'

export const Routes = {
    Campaign: "/api/campaign/",
    Category: "/api/category/",
    Tag: "/api/tag/",
}

export async function getDataWithHook(url, setValue, setError, setIsLoaded) {
    if (setError && setIsLoaded) {
        await fetch(url).then(res => res.json())
            .then(
                (result) => { console.log(result); setValue(result); setIsLoaded(true); },
                (error) => { setError(error); setIsLoaded(true); }
            );
    } else {
        await fetch(url).then(res => res.json())
            .then((result) => { setValue(result) }, (error) => { console.error(error) });
    }
}

export async function authorizedRequest(method, url, data, isFormdata) {
    const isAuthenticated = await authService.isAuthenticated;
    const token = await authService.getAccessToken();
    const user = await authService.getUser();
    return new Promise((resolve, reject) => {
        if (!isAuthenticated) reject({ message: "User is not Authenticated" })
        data.creatorId = user.sub;

        let requestBody = isFormdata ? Converters.toFormData(data) : JSON.stringify(data);
        fetch(url, {
            method: method,
            headers: {
                //'Content-Type': 'application/json',
                //'Content-Length': dataString.length,
                'Credentials': 'same-origin',
                'Authorization': `Bearer ${token.toString()}`
            },
            body: requestBody
        }).then((res) => res.json())
    })
}
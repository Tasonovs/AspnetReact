import authService from '../api-authorization/AuthorizeService'


export const Routes = {
    Campaign: "/api/campaign",
    Category: "/api/category",
    Tag: "/api/tag",
}

export async function getDataWithHook(url, setValueHook) {
    await fetch(url).then(res => res.json())
        .then((result) => { setValueHook(result) }, (error) => { console.error(error) });
}

export async function authorizedPost(url, data) {
    const isAuthenticated = await authService.isAuthenticated;
    const token = await authService.getAccessToken();
    const user = await authService.getUser();
    return new Promise((resolve, reject) => {
        if (!isAuthenticated) reject({ message: "User is not Authenticated" })
        data.creatorId = user.sub;
        let dataString = JSON.stringify(data);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataString.length,
                'Credentials': 'same-origin',
                'Authorization': `Bearer ${token.toString()}`
            },
            body: dataString
        }).then((res) => res.json())
            .then(
                (result) => resolve(result),
                (error) => reject(error)
            )
    })
}
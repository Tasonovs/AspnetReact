import React from 'react'
import authService from 'api/api-authorization/AuthorizeService'
import * as Converters from 'components/common/Converters'

export const Routes = {
    Campaign: "/api/campaign/",
    CampaignByUserId: "/api/campaign/user/",
    Category: "/api/category/",
    Tag: "/api/tag/",
    Uploads: "/api/uploads/",
    Comments: "/api/comment/",
}

export function useGetRequest(url, updateParamsArray = []) {
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(undefined);

    React.useEffect(() => {
        fetch(url).then(res => res.json())
            .then(
                (result) => { setData(result); setIsLoading(false); },
                (error) => { setError(error); setIsLoading(false); }
            );
    }, updateParamsArray)

    return [data, isLoading, error];
}

export function useGetCategoriesAndTags() {
    const [categories, categoriesIsLoading, categoriesError] = useGetRequest(Routes.Category);
    const [tags, tagsIsLoading, tagsError] = useGetRequest(Routes.Tag);

    return [categories, tags, categoriesIsLoading || tagsIsLoading, categoriesError ? categoriesError : tagsError];
}

export async function sendCampaignDataFromForm(method, formElement, data, id) {
    const isAuthenticated = await authService.isAuthenticated;
    if (!isAuthenticated) return { error: "User is not Authenticated" };
    
    const token = await authService.getAccessToken();
    const user = await authService.getUser();

    let formdata = new FormData(formElement);
    if (id !== undefined) formdata.append("id", id);
    if (!data.creatingDate) formdata.append("creatingDate", (new Date()).toISOString());
    formdata.append("updatingDate", (new Date()).toISOString());
    formdata.append("creatorId", user.sub);

    let options = {
        method: method,
        body: formdata,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return fetch(Routes.Campaign, options).then((res) => res.json())
}
export async function secureFetch(method, url, data) {
    const isAuthenticated = await authService.isAuthenticated;
    if (!isAuthenticated) return { error: "User is not Authenticated" };
    
    const token = await authService.getAccessToken();

    let options = {
        method: method,
        body: JSON.stringify(data),
        'Content-Type': "application/json, charset=utf-8",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return fetch(url, options).then((res) => res.json())
}
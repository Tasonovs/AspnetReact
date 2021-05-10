import React, { useEffect, useState } from 'react';
import CampaignCard from "components/campaigns/CampaignCard"
import authService from 'api/api-authorization/AuthorizeService'
import { Button } from 'react-bootstrap';
import * as Api from "api/Requests"


export default function ReadPage(props) {
    // const [error, setError] = useState(null);
    // const [isLoaded, setIsLoaded] = useState(false);
    // const [item, setItem] = useState(undefined);
    const [item, isLoading, error] = Api.useGetRequest("/api/campaign/"+props.match.params.id, [props.match.params.id]);
    const [user, setUser] = useState(undefined);
    

    useEffect( async () => {
        await authService.getUser().then(u => setUser(u));
    }, [])

    if (error) return <div>Error: {error.message}</div>;
    else if (isLoading) return <div>Loading...</div>;
    else if (!item) return <div>There is no any item yet</div>;
    else {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h1>Campaign '{item.name}'</h1>
                {(item?.creatorId === user?.sub) && <Button href={"/campaign/edit/"+props.match.params.id}>Edit</Button>}
                <div className="d-flex justify-content-center align-items-stretch flex-wrap">
                    <CampaignCard campaign={item} />
                </div>
            </div>
        );
    }
}

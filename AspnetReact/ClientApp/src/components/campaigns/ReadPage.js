import React, { useEffect, useState } from 'react';
import CampaignCard from "./CampaignCard"
import authService from '../api-authorization/AuthorizeService'
import { Button } from 'react-bootstrap';
import * as Api from "../api-controller/Requests"


export default function ReadPage(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState(undefined);
    const [user, setUser] = useState(undefined);
    

    useEffect( async () => {
        await authService.getUser().then(u => setUser(u));
        await fetch("/api/campaign/"+props.match.params.id)
            .then(res => res.json())
            .then(
                (result) => { setIsLoaded(true); setItem(result); },
                (error) => { setIsLoaded(true); setError(error); }
            )

            
    }, [props.match.params.id])

    if (error) return <div>Ошибка: {error.message}</div>;
    else if (!isLoaded) return <div>Загрузка...</div>;
    else if (!item) return <div>Пока в базе отсутствуют записи</div>;
    else {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h1>Campaign '{item.name}'</h1>
                {isLoaded && (item.creatorId === user.sub) && <Button href={"/campaign/edit/"+props.match.params.id} >Edit</Button>}
                <div className="d-flex justify-content-center align-items-stretch flex-wrap">
                    <CampaignCard campaign={item} />
                </div>
            </div>
        );
    }
}

import React, { useEffect, useState } from 'react';
import CampaignCard from "./CampaignCard"

export function AllCampaignsPage() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("/api/campaign")
            .then(res => res.json())
            .then(
                (result) => { setIsLoaded(true); setItems(result); },
                (error) => { setIsLoaded(true); setError(error); }
            )
    }, [])

    if (error) return <div>Ошибка: {error.message}</div>;
    else if (!isLoaded) return <div>Загрузка...</div>;
    else if (!items) return <div>Пока в базе отсутствуют записи</div>;
    else {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="mb-3">Campaigns</h1>
                <div className="d-flex justify-content-center align-items-stretch flex-wrap">
                    {items.map(item => (
                        <CampaignCard key={item.id} campaign={item} />
                    ))}
                </div>
            </div>
        );
    }
}

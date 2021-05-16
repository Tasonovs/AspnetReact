import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toTimeHasPassed } from 'components/common/Converters'

export default function CampaignCard({ campaign }) {
    let maxTextLength = 40;

    //TODO should get its own method GMT
    campaign.creatingDate = new Date(campaign.creatingDate);
    campaign.creatingDate.setTime(campaign.creatingDate.getTime() - campaign.creatingDate.getTimezoneOffset() * 60 * 1000);

    return (
        <Card style={{ width: "16rem", height: "24rem" }}>
            <Card.Img src={campaign.images.length ? "api/uploads/" + campaign.images[0].url : "/images/default.png"}
                style={{ width: "100%", height: "9rem", objectFit: "cover", objectPosition: "center", }} />
            <Card.Body>
                <Card.Title><Link to={"/campaign/" + campaign.id}>{campaign.name}</Link></Card.Title>
                <Card.Subtitle className="text-black-50">{campaign.creator.userName}</Card.Subtitle>
                <div className="my-1">
                    <span className="badge badge-primary mr-1">{campaign.category.name}</span>
                    {campaign.tags &&
                        campaign.tags.map(tag => (<span key={tag.id} className="badge badge-secondary mr-1">{tag.name}</span>))}
                </div>
                <Card.Text>
                    {campaign.description.length <= maxTextLength && campaign.description}
                    {campaign.description.length > maxTextLength && campaign.description.substring(0, maxTextLength) + '...'}
                </Card.Text>
            </Card.Body>
            <Card.Footer>{toTimeHasPassed(campaign.creatingDate)}</Card.Footer>
        </Card>
    );
}

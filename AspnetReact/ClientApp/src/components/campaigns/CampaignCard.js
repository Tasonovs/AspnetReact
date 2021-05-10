import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
            <Card.Footer>{countTimeHasPassed(campaign.creatingDate)}</Card.Footer>
        </Card>
    );
}

// https://stackoverflow.com/a/12475270
function countTimeHasPassed(time) {
    switch (typeof time) {
        case 'number':
            break;
        case 'string':
            time = +new Date(time);
            break;
        case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
        default:
            time = +new Date();
    }
    var time_formats = [
        [60, 'seconds', 1], // 60
        [120, '1 minute ago', '1 minute from now'], // 60*2
        [3600, 'minutes', 60], // 60*60, 60
        [7200, '1 hour ago', '1 hour from now'], // 60*60*2
        [86400, 'hours', 3600], // 60*60*24, 60*60
        [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
        [604800, 'days', 86400], // 60*60*24*7, 60*60*24
        [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
        // [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        // [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    ];
    let max_seconds = time_formats[time_formats.length - 1][0];
    var seconds = (+new Date() - time) / 1000, token = 'ago', list_choice = 1;

    if (seconds >= max_seconds) return new Date(time).toLocaleDateString();

    if (seconds === 0) return 'Just now'

    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'from now';
        list_choice = 2;
    }

    var i = 0, format;
    while (true) {
        format = time_formats[i++]
        if (seconds < format[0]) {
            if (typeof format[2] == 'string')
                return format[list_choice];
            else
                return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
    }
}

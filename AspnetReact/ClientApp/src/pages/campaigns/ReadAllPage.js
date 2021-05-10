import React, { useEffect, useState } from 'react';
import * as Api from "api/Requests"

import CampaignCard from "components/campaigns/CampaignCard"
import { LoadingAndErrors } from 'components/common'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

export default function ReadAllPage() {
    const [campaigns, isLoading, error] = Api.useGetRequest("/api/campaign");

    LoadingAndErrors(campaigns, isLoading, error)
    return (
        <section>
            <h1 className="mb-3 text-center">Campaigns <Link to="/campaign/create">(add)</Link></h1>
            <Container className="d-inline-flex flex-wrap justify-content-around">
                {campaigns.map(item => (<CampaignCard key={item.id} campaign={item} />))}
            </Container>
        </section>
    );
}

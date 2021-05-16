import React, { useEffect, useState } from 'react';
import * as Api from "api/Requests"

import CampaignCard from "components/campaigns/CampaignCard"
import { LoadingAndErrors } from 'components/common'
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa';

export default function ReadAllPage(props) {
    const pageNum = Number.parseInt(props.match.params.pageNum);
    const [data, isLoading, error] = Api.useGetRequest(Api.Routes.Campaign + "page/" + pageNum, [pageNum]);

    return (
        <Container>
            <Row className="d-flex align-items-center justify-content-between">
                <span className="d-flex align-items-center justify-content-between">
                    <h1>Campaigns</h1>
                    <Link className="mx-2" to="/campaign/create">
                        <Button><FaPlus/> Create</Button>
                    </Link>
                </span>
                <span>
                    <Link to={"/campaigns/page/" + (pageNum - 1)}>
                        <Button disabled={pageNum <= 1}><FaArrowLeft/> Prev</Button>
                    </Link>
                    <Link to={"/campaigns/page/" + (pageNum + 1)}>
                        <Button disabled={pageNum >= data.maxPageNum}>Next <FaArrowRight/></Button>
                    </Link>
                </span>
            </Row>
            
            <LoadingAndErrors data={data.campaigns} isLoading={isLoading} error={error} children={(
                <Container className="d-inline-flex flex-wrap justify-content-around">
                    {data.campaigns?.map(item => (<CampaignCard key={item.id} campaign={item} />))}
                </Container>
            )} />
        </Container>
    );
}

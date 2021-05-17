import React from 'react';
import * as Api from "api/Requests"
import { Button, Container, Row } from 'react-bootstrap';
import { LoadingAndErrors } from 'components/common';
import CampaignCard from 'components/campaigns/CampaignCard';
import { Link } from 'react-router-dom';
import { FaHandPointer } from 'react-icons/fa';
export default function Home() {
  const [data, isLoading, error] = Api.useGetRequest(Api.Routes.Campaign + "page/1");

  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-between">

        <h1>Recent campaigns</h1>
        <Link to={"/campaigns/page/1"}>
          <Button><FaHandPointer /> More</Button>
        </Link>

      </Row>
      <hr />
      <LoadingAndErrors data={data.campaigns} isLoading={isLoading} error={error} children={(
        <Container className="d-inline-flex flex-wrap justify-content-around">
          {data.campaigns?.map(item => (<CampaignCard key={item.id} campaign={item} />))}
        </Container>
      )} />
    </Container>
  );
}

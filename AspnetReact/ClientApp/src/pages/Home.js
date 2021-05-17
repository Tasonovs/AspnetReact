import React, { Component } from 'react';
import * as Api from "api/Requests"
import { Container } from 'react-bootstrap';
import { LoadingAndErrors } from 'components/common';
import CampaignCard from 'components/campaigns/CampaignCard';
export default function Home() {
  const [data, isLoading, error] = Api.useGetRequest(Api.Routes.Campaign + "page/1");

  return (
    <Container>
      <h1>Recent campaigns</h1>
      <hr />
      <LoadingAndErrors data={data.campaigns} isLoading={isLoading} error={error} children={(
        <Container className="d-inline-flex flex-wrap justify-content-around">
          {data.campaigns?.map(item => (<CampaignCard key={item.id} campaign={item} />))}
        </Container>
      )} />
    </Container>
  );
}

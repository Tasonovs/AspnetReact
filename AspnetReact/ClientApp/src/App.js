import React, { Component } from 'react';
import { Route } from 'react-router';
import AuthorizeRoute from 'api/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from 'api/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from 'api/api-authorization/ApiAuthorizationConstants';
import { Container } from 'react-bootstrap';
import { NavMenu } from 'components/NavMenu';

import 'custom.css'
import { Home } from 'pages/HomePage';
import { FetchData } from 'pages/FetchData';
import * as Campaign from 'pages/campaigns/';


export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <>
        <NavMenu />
        <main>
          <Container style={{paddingTop: "70px"}}>
            <Route exact path='/' component={Home} />

            <Route exact path='/campaigns' component={Campaign.ReadAllPage} />
            <Route path="/campaign/:id(\d+)" component={Campaign.ReadPage} />
            <AuthorizeRoute path="/campaign/create" component={Campaign.CreateUpdatePage} />
            <AuthorizeRoute path="/campaign/edit/:id(\d+)" component={Campaign.CreateUpdatePage} />

            <AuthorizeRoute path='/fetch-data' component={FetchData} />
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
          </Container>
        </main>
      </>
    );
  }
}

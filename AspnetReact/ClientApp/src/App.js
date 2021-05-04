import React, { Component } from 'react';
import { Route } from 'react-router';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { Container } from 'reactstrap';
import { NavMenu } from './components/NavMenu';

import './custom.css'
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import * as Campaign from './components/campaigns/';


export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <>
        <NavMenu />
        <main>
          <Container>
            <Route exact path='/' component={Home} />

            <Route path='/campaigns' component={Campaign.ReadAllPage} />
            <Route path="/campaign/read/:id" component={Campaign.ReadPage} />
            <AuthorizeRoute path="/campaign/create" component={Campaign.CreatePage} />
            <AuthorizeRoute path="/campaign/edit/:id" component={Campaign.UpdatePage} />

            <Route path='/upload' component={Campaign.UploadTestPage} />

            <AuthorizeRoute path='/fetch-data' component={FetchData} />
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
          </Container>
        </main>
      </>
    );
  }
}

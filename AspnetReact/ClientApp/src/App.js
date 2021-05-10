import React, { Component } from 'react';
import { Route } from 'react-router';
import AuthorizeRoute from 'api/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from 'api/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from 'api/api-authorization/ApiAuthorizationConstants';
import { Container } from 'react-bootstrap';
import { NavMenu } from 'components/NavMenu';

import 'custom.css'
import * as Pages from 'pages/';


export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <>
        <NavMenu />
        <main>
          <Container style={{ paddingTop: "70px" }}>
            <Route exact path='/' component={Pages.Home} />
            <Route path='/about' component={Pages.About} />

            <Route exact path='/campaigns' component={Pages.Campaign.ReadAll} />
            <Route path="/campaign/:id(\d+)" component={Pages.Campaign.Read} />
            <AuthorizeRoute path="/campaign/create" component={Pages.Campaign.CreateUpdate} />
            <AuthorizeRoute path="/campaign/edit/:id(\d+)" component={Pages.Campaign.CreateUpdate} />

            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
          </Container>
        </main>
      </>
    );
  }
}

import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { AllCampaignsPage } from './components/campaigns/CampaignsReadAll';
import { CampaignPage } from './components/campaigns/CampaignReadById';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />

        <Route path='/campaigns' component={AllCampaignsPage} />
        <Route path="/campaign/:id" component={CampaignPage}/>
        
        <AuthorizeRoute path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}

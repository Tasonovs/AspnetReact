import React, { Component, Fragment } from 'react';
import { Nav, NavDropdown, NavItem, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
    }

    authenticatedView(userName, profilePath, logoutPath) {
        return (<Fragment>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={profilePath}>Edit profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile/campaigns">My campaigns</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile/bonuses">My bonuses</NavDropdown.Item>
            </NavDropdown>
            <NavLink as={Link} to={logoutPath}>Logout</NavLink>
        </Fragment>);

    }

    anonymousView(registerPath, loginPath) {
        return (<Fragment>
            <NavLink as={Link} to={registerPath}>Register</NavLink>
            <NavLink as={Link} to={loginPath}>Login</NavLink>
        </Fragment>);
    }
}

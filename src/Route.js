import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/Admin';
import history from './History'
// import createBrowserHistory from 'history/createBrowserHistory'

// const history = createBrowserHistory()

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route path="/admin" component={Admin} />
                </div>
            </Router>
        )
    }
}

export default Routers;
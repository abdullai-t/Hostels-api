import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import AdminLayoutRoute from './admin-container/miscellaneous/AdminLayout'

// admin components
import Dashboard from './admin-container/components/Dashboard'

// client side components
import HomePage from './client-container/home'



class App extends Component {
  render() {
    return (
      <Router>
      <Switch>
      <AdminLayoutRoute path="/admin" component= {Dashboard}/>
      <Route path="/" component= {HomePage}/>
      </Switch>
    </Router>
    );
  }
}

export default App;
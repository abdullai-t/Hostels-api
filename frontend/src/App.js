import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'



// admin components
import Dashboard from './admin-container/components/Dashboard'
import AdminLayoutRoute from './admin-container/miscellaneous/AdminLayout'
import AdminLogin from './admin-container/login'

// client side components
import HomePage from './client-container/home'



class App extends Component {
  render() {
    return (
      <Router>
      <Switch>
      <AdminLayoutRoute  path="/admin/dashboard" component= {Dashboard}/>
      <Route exact path="/admin/login" component= {AdminLogin}/>
      <Route path="/" component= {HomePage}/>
      </Switch>
    </Router>
    );
  }
}

export default App;
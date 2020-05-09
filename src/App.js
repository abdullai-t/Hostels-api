import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// my imports
import Register from './components/auth/register'
import Landing from './components/landing'
import Login from './components/auth/login'
import Home from './components/dashboard/home'


import PasswordResetConfirm from './components/auth/passwordResetConfirm'
import {DashboardLayoutRoute} from './components/dashboard/dashboardLayout'
import BookRoom from './components/dashboard/book room'
import LocationDetails from './components/dashboard/book room/locationDetails'
import HostelDetails from './components/dashboard/book room/hostelDetails'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route path="/api-auth/reset/:uid/:token" component={PasswordResetConfirm} />
        <Route exact path="/login" component= {Login}/>
        <Route exact path="/register" component= {Register}/>

        <DashboardLayoutRoute exact path="/home" component= {Home}/>
        <DashboardLayoutRoute exact path="/book/:location/:hostel" component= {HostelDetails}/>
        <DashboardLayoutRoute exact path="/book/:location" component={LocationDetails} />
        <DashboardLayoutRoute exact path="/book" component={BookRoom} />

        <Route exact path="/" component= {Landing}/>
        <Route path="*" component = {()=>"404 Page not found"} />
        </Switch>
      </Router>
    )
  }
}
export default App

  
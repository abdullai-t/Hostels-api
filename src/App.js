import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// my imports
import Register from './components/auth/register'
import Landing from './components/landing'
import Login from './components/auth/login'
import Home from './components/dashboard'
import PasswordResetConfirm from './components/auth/passwordResetConfirm'
import {ProtectedRoutes} from './components/protectedRoutes'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route path="/api-auth/reset/:uid/:token" component={PasswordResetConfirm} />
        <Route exact path="/login" component= {Login}/>
        <Route exact path="/register" component= {Register}/>
        <ProtectedRoutes exact path="/home" component= {Home}/>
        <Route exact path="/" component= {Landing}/>
        <Route path="*" component = {()=>"404 Page not found"} />
        </Switch>
      </Router>
    )
  }
}
export default App

  
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// my imports
import Register from './components/auth/register'
import Landing from './components/landing'
import Login from './components/auth/login'
import Home from './components/dashboard/home'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route path="/login" component= {Login}/>
        <Route path="/register" component= {Register}/>
        <Route path="/home" component= {Home}/>
        <Route path="/" component= {Landing}/>
        </Switch>
      </Router>
    )
  }
}
export default App

    // $.ajax({
    //   type: "GET",
    //   url: "/hostel/search",
    //   data: {
    //     search: $("#search").val()
    //   },
    //   error: function(jqXHR, textStatus, error) {
    //     console.log(error);
    //   }
    // });
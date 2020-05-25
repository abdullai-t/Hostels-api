import React from 'react'
import SideNav from './SideNav'
import {Route, Redirect} from 'react-router-dom'
import auth from '../../auth'


const AdminLayoutRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (auth.isAuthenticated) {
            return(
              <SideNav component={Component} {...rest} {...props} />
            )
            
          }
          return(
            <Redirect to={
              {
                  pathname:'/admin/login',
                  state:props.location
              }
          } />
          )
        }}
      />
    );
  };
export default  AdminLayoutRoute
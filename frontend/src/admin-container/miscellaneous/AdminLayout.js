import React from 'react'
import SideNav from './SideNav'
import {Route, Redirect} from 'react-router-dom'

const AdminLayoutRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (2>3) {
            return <Redirect to="/login" />;
          }
          return(
              <SideNav component={Component} {...rest} {...props} />
          )
        }}
      />
    );
  };
export default  AdminLayoutRoute
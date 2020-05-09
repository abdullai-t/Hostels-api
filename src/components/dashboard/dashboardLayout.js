import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from '../auth/auth'
import SideNav from '../miscellaneous/SideNav'


export const DashboardLayoutRoute =({component:Component, ...rest})=>{
    return(
        <Route {...rest} render={
            (props)=>{
                if(auth.isAuthenticated){
                    return <SideNav component={Component} {...rest} {...props} />
                }
                else{
                    return <Redirect to={
                        {
                            pathname:'/login',
                            state:props.location
                        }
                    } />
                }
                
            }
        }/>
    )
}
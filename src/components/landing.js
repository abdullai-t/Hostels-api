import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Landing extends Component {
    render() {
        return (
            <div className="landing-body">
                <div className="top-item">
                    <div className="landing-login">
                        <Link to="/login" className="ui inverted basic button"> Log in</Link>
                    </div>
                    <div className="discip">
                        <h1>HOSTELS</h1>
                        <p>An online platform for booking hostels</p>
                        <Link to="/register" className="ui inverted basic button">Get Started</Link>
                    </div>
                </div>                
            </div>

        )
    }
}

import React, { Component } from 'react'
import axios from 'axios'
import '../../App.css'
import { Link } from 'react-router-dom'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            token: ''
        }
    }

    handleSubmit = (event) => {

        const { username, password } = this.state

        axios.post('http://127.0.0.1:8000/api-auth/login/', {

            username: username,
            password: password,
        })
            .then(res => {
                this.setState({ token: res.data.token })
                console.log(this.state.token)
                if (res.data.token) {
                    this.props.history.push({
                        pathname: '/home',
                        token:this.state.token
                    })
                }
            })
        event.preventDefault();

    }

    render() {
        return (
            <div className="register-main">
                <div className="ui segment">
                    <form className="ui form" onSubmit={this.handleSubmit}>
                        <div className="register-title">
                            Log in
                </div>

                        <div className="required field">
                            <label>Username</label>
                            <input placeholder="username" value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} />
                        </div>

                        <div className="required field">
                            <label>Password</label>
                            <input placeholder="password" type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                        </div>
                        <button type="submit" className="ui button">log in</button>
                        <Link to="/register" className="ui button"> register</Link>
                        <div className="forgot">
                            <a href="http://127.0.0.1:8000/api-auth/password/reset/">forgot password ?</a>
                        </div>

                    </form>


                </div>
            </div>
        )
    }
}

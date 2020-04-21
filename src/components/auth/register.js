import React, { Component } from 'react'
import axios from 'axios'
import '../../App.css'
import { Link } from 'react-router-dom'

export default class register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fname: '', lname: '', username: '', contact: '', year: '', password: '', password2: '', email: ''
        }
    }

    handleSubmit = (event) => {

        const { fname, lname, username, contact, year, email, password, password2 } = this.state

        axios.post('http://127.0.0.1:8000/api-auth/register/', {
            first_name: fname,
            last_name: lname,
            username: username,
            email: email,
            year: year,
            contact: contact,
            password: password,
            password2: password2
        })
            .then((res) => {
                if (res.data.token) {
                    this.props.history.push('/login')
                }
            }

            );

        event.preventDefault();

    }

    render() {
        return (
            <div className="register-main">
                <div className="ui segment">
                    <form className="ui form" onSubmit={this.handleSubmit}>
                        <div className="register-title">
                            Register
                        </div>

                        <div className="required field">
                            <label>First Name</label>
                            <input placeholder="First Name" value={this.state.fname} onChange={(event) => this.setState({ fname: event.target.value })} />
                        </div>
                        <div className="required field">
                            <label>Last Name</label>
                            <input placeholder="Last Name" value={this.state.lname} onChange={(event) => this.setState({ lname: event.target.value })} />
                        </div>
                        <div className="required field">
                            <label>Username</label>
                            <input placeholder="username" value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} />
                        </div>
                        <div className="required field">
                            <label>Email</label>
                            <input placeholder="email" type="email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                        </div>

                        <div className="required field">
                            <label>Contact</label>
                            <input placeholder="contact" type="tel" value={this.state.contact} onChange={(event) => this.setState({ contact: event.target.value })} />
                        </div>

                        <div className="required field">
                            <label>Year</label>
                            <select value={this.state.year} onChange={(event) => this.setState({ year: event.target.value })}>
                                <option>select year</option>
                                <option value="1st year">1st year</option>
                                <option value="2nd year">2nd year</option>
                                <option value="3rd year">3rd year</option>
                                <option value="4th year">4th year</option>
                            </select>
                        </div>



                        <div className="required field">
                            <label>Password</label>
                            <input placeholder="password" type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                        </div>
                        <div className="required field">
                            <label>Confirm password</label>
                            <input placeholder="confirm password" type="password" value={this.state.password2} onChange={(event) => this.setState({ password2: event.target.value })} />
                        </div>
                        <button type="submit" className="ui button">Register</button>

                        <Link to="/login" className="ui button"> login </Link>
                    </form>


                </div>
            </div>

        )
    }
}


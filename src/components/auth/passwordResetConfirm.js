import React, { Component } from 'react'
import axios from 'axios'
import '../../App.css'


export default class passwordResetConfirm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            pass1: '',
            pass2: '',
            token: '',
            uid: ''
        }

    }
    submitPasswordResetData = (e) => {
        const { pass1, pass2, uid, token } = this.state
        axios.post(`http://127.0.0.1:8000/api-auth/reset/${uid}/${token}/`, {
            new_password1: pass1,
            new_password2: pass2
        })

        e.preventDefault()
    }
    componentDidMount() {
        const { params } = this.props.match
        this.setState({ token: params.token, uid: params.uid })
    }

    render() {
        return (
            <div className="ui text center container register-main">
                <div className="ui raised segment">
                    <form className="ui form" onSubmit={this.submitPasswordResetData}>
                        <div className="register-title">
                            Password Reset
                     </div>

                        <div className="required field">
                            <label>New Password</label>
                            <input placeholder="new password" type="password" value={this.state.pass1} onChange={(event) => this.setState({ pass1: event.target.value })} />
                        </div>

                        <div className="required field">
                            <label>confirm new password</label>
                            <input placeholder="confirm password" type="password" value={this.state.pass2} onChange={(event) => this.setState({ pass2: event.target.value })} />
                        </div>
                        <button type="submit" className="ui button">Reset Password</button>
                    </form>


                </div>0246399210
            </div>
        )
    }
}



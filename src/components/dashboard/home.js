import React, { Component } from 'react'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: ''
        }
    }

    componentDidMount() {
        this.setState({ token: localStorage.getItem('token') })
    }
    render() {

        return (
            <div>

            </div>
        )
    }
}

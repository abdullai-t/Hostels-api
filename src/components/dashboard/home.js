import React, { Component } from 'react'
import axios from 'axios'


export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            locations: [],

        }
    }


    componentDidMount() {
        // const { token } = this.props.location
        axios.get(`http://127.0.0.1:8000/api-hostels/Bomsu/hostels/`
            // headers: {
            //     Authorization: 'Token ' + token //the token is a variable which holds the token
            //   }
        )
            .then(res => {
                const locations = res.data;
                this.setState({ locations });
            })
    }


    render() {

        return (
            <div>
                <ul>
                    {this.state.locations.map(location => <li key={location.name}>{location.name}
                        <p>{location.description} </p>
                        {console.log(location.image)}
                        <img src={location.image} />
                    </li>)}
                </ul>
            </div>
        )
    }
}

import React, { Component } from 'react'
import {Grid} from '@material-ui/core'
import axios from 'axios'
import {Link} from 'react-router-dom'




  
export default class BookRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            data:[]
        }
    }

    componentDidMount() {
        this.setState({ token: localStorage.getItem('token') })

        axios.get(`http://127.0.0.1:8000/api-hostels/locations/`)
        .then(res=>{
            this.setState({data:res.data})
        })
        .catch(err=>{console.log(err)})
       
    }
    render() { 
        const {data} = this.state
       return (
        <Grid container >
            {data.map(loc=>{
                return(
                    <Grid item xs={12} md={4}>
                    <div class="ui card" style={{margin:"2%"}}>
                    <div class="image">
                        <img src={loc.image}  style={{height:164}} alt=""/>
                    </div>
                    <div class="extra content">
                    <Link to={`/book/${loc.name}`}>{loc.name}</Link>
                    </div>
                    </div>
                </Grid>
                )
            })}

        </Grid>
        )
    }
}

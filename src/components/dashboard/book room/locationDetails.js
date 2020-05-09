import React, { Component } from 'react'
import { Image, Divider  } from 'semantic-ui-react'
import axios from 'axios'
import { Grid } from '@material-ui/core'
import {Link} from 'react-router-dom'

export default class Hostels extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: true
        }
    }
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api-hostels/${this.props.match.params.location}/hostels/`)
            .then(res => {
                this.setState({ data: res.data, isLoading: false })
                console.log(this.state.data)
            })
            .catch(err => { console.log(err) })


    }

    render() {
        const { data, isLoading } = this.state
        return (
            <div>
                {
                    !isLoading ? (
                    <div>
                        <Grid container style={{ margin: "2%", marginBottom:"10%" }}  >
                            <Grid item xs={12} md={6}>
                                <Image src={'http://127.0.0.1:8000' + data[0].location.image} size='large' alt="" />

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <h1>About {data[0].location.name}</h1>
                                <p style={{ textAlign: "justify", paddingRight: "4%" }}>
                                    {data[0].location.description}
                                </p>
                            </Grid>
                        </Grid>

                    <Divider horizontal style={{ marginBottom:"3%" }} >BROWSE HOSTELS</Divider>

                    <Grid container >
                        {data.map(hostel=>{
                        return(
                        <Grid item xs={12} md={4}>
                        <div class="ui card" style={{margin:"2%"}}>
                            <div class="image">
                                <img src={'http://127.0.0.1:8000' + hostel.image}  style={{height:164}} alt=""/>
                            </div>
                            <div class="extra content">
                                <Link to={`/book/${hostel.location.name}/${hostel.name}`}>{hostel.name}</Link>
                            </div>
                        </div>
                    </Grid>
                )
            })}

        </Grid>


                </div>
                    ) :
                        (
                            <h3>Loading.........</h3>
                        )
                }


            </div>
        )
    }
}

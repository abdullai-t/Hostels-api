import React, { Component } from 'react'
import { Image, Divider,Form  } from 'semantic-ui-react'
import axios from 'axios'
import { Grid } from '@material-ui/core'
// import {Link} from 'react-router-dom'

export default class Hostels extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: true
        }
    }
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api-hostels/${this.props.match.params.hostel}/rooms/`)
            .then(res => {
                this.setState({ data: res.data.room, isLoading: false })
                console.log(this.props.match.params.hostel)
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
                                <Image src={'http://127.0.0.1:8000' + data[0].hostel.image} size='large' alt="" />

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <h1>About {data[0].hostel.name}</h1>
                                <p style={{ textAlign: "justify", paddingRight: "4%" }}>
                                    {data[0].hostel.description}
                                </p>
                            </Grid>
                        </Grid>

                    <Divider horizontal style={{ marginBottom:"3%" }} >BROWSE Rooms</Divider>

                    <Form.Field label='' control='select'>
                    <option >select room</option>
                        {data.map(room =>{
                            return(
                                <option value='male'>{room.room_type}</option>
                            )      
                             
                        })}
                       
                    </Form.Field>


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
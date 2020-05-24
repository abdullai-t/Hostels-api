import React, { Component } from 'react'
import { Icon,Segment, Loader, Table, Dimmer} from 'semantic-ui-react'
import axios from 'axios'

import Grid from '@material-ui/core/Grid';
import HostelsPerLocation from '../charts/HostelsPerLocation';
import UserPerHostel from '../charts/UserPerHostel'
import RoomTypeChart from '../charts/RoomTypeChart'


const styles = {

    center:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:"center",
        backgroundColor:'#347ab7',
        color:'white',
        width:"90%"
    },
    spacing:{
        marginTop:"5%",
        marginBottom:"3%"
    },


}

export default class Dashboard extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             data:[],
             isLoading:true,
             count:0,
        }
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/api-admin/dashboard/`)
          .then(res=>{
              this.setState({
                  data:res.data,
                  isLoading:false
              })
             
          })
          .catch(err=>{
              this.setState({
                data:err,
                isLoading:false
              })
          })
    }
    
    
    render() {
        const {hostels, locations, bookedRooms, users,leatherboard, roomsChart} = this.state.data
        return (
            <div>
                {!this.state.isLoading ? (
             <div>
                <Grid container >

                    <Grid item xs={6} md={3} sm={6} >
                        <Segment raised style={styles.center}>
                            <div>
                                <h1>{users}</h1>
                                <p>Registered Users</p>
                            </div>
                            <div>
                            <Icon name='user' size="huge" round />
                            </div>
                        </Segment>
                    </Grid>

                    {/* location */}

                    <Grid item xs={6} md={3} sm={6} >
                        <Segment raised style={styles.center}>
                            <div>
                                <h1>{locations}</h1>
                                <p>Locations of Hostels</p>
                            </div>
                            <div>
                            <Icon name='university' size="huge" round />
                            </div>
                        </Segment>
                    </Grid>

                    {/* Hostels */}

                    <Grid item xs={6} md={3} sm={6} >
                        <Segment raised style={styles.center}>
                            <div>
                                <h1>{hostels}</h1>
                                <p>Total Hostels</p>
                            </div>
                            <div>
                            <Icon name='hotel' size="huge" round />
                            </div>
                        </Segment>
                    </Grid>

                    {/* booked rooms */}

                    <Grid item xs={6} md={3} sm={6} >
                        <Segment raised style={styles.center}>
                            <div>
                                <h1>{bookedRooms}</h1>
                                <p>Total Booked Room</p>
                            </div>
                            <div>
                            <Icon name='bookmark' size="huge" round />
                            </div>
                        </Segment>
                    </Grid>
   
                </Grid>

                {/* All statistics */}
                 {/* barcharts */}

                 <Grid container style={styles.spacing}>
                    
                    <Grid item xs={12} md={6} sm={12} >
                    <Segment raised >
                        <UserPerHostel />
                    </Segment>
                    </Grid>

                    <Grid item xs={12} md={6} sm={12}>
                    <Segment raised  style={{marginLeft:'3%'}}>
                        <UserPerHostel />
                    </Segment>
                    </Grid>
                    </Grid>

                {/* recent booked rooms */}
                <Grid container style={styles.spacing}>
                                      
                    <Grid item xs={12} md={6} sm={12}>
                        <Segment raised>  
                           <RoomTypeChart rooms={roomsChart} />
                        </Segment>
                    </Grid>

                    <Grid item xs={12} md={6} sm={12} >
                        <Segment raised  style={{marginLeft:'3%'}}>
                        <HostelsPerLocation />
                        </Segment>
                    </Grid>

                </Grid>

                {/* Leaderboard */}

                <Segment raised>  
                            <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>#</Table.HeaderCell>
                                    <Table.HeaderCell>user</Table.HeaderCell>
                                    <Table.HeaderCell>hostel</Table.HeaderCell>
                                    <Table.HeaderCell>Room Type</Table.HeaderCell>
                                    <Table.HeaderCell>price</Table.HeaderCell>
                                    {/* <Table.HeaderCell>Room Type</Table.HeaderCell> */}

                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {leatherboard.map(roomItem=>{
                                    
                                    return(
                                    <Table.Row>
                                        <Table.Cell>{this.state.count+=1}</Table.Cell>
                                        <Table.Cell>{roomItem.user.username}</Table.Cell>
                                       <Table.Cell>{roomItem.room.hostel.name}</Table.Cell>
                                       <Table.Cell>{roomItem.room.room_type}</Table.Cell>
                                       <Table.Cell>{roomItem.room.price}</Table.Cell>
                                    </Table.Row>
                                    )
                                })}

                            </Table.Body>

                        </Table>
                        </Segment>


                </div>
        
                )
                : 
                (
                    <Dimmer active>
                    <Loader />
                  </Dimmer>
              
                )
            }




                {/* Users per location  barchart*/}


                {/* users per year group pie chart */}

                
                {/* users per hostel barchar */}
                 

                
            </div>
        )
    }
}



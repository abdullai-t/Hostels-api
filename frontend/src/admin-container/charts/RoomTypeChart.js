import React, { Component } from 'react'
import {Pie} from 'react-chartjs-2';
import axios from 'axios'


export default class HostelsPerLocation extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:[],
             isLoading:true
        }
    }
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/api-admin/pi-data/`)
            .then(res=>{this.setState({data:res.data, isLoading:false})})
            .catch(err=>{console.log(err)})
    }
    
    render() {
        const {roomsChart} = this.state.data
      
        return (
            <div>
            {!this.state.isLoading ?(
                <div>
                <Pie data={{
                    labels: [
                        '1 in 1',
                        '2 in 1',
                        '3 in 1',
                        '4 in 1'
                    ],
                    datasets: [{
                        data: [roomsChart.one,roomsChart.two,roomsChart.three,roomsChart.four],
                        backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#fb8313',
                        ],
                        hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#fb8313',
                        ]
                    }]
                }}/>     
                 <h3  style={{textAlign:'center'}}>Distribution By Room Type</h3> 
                 </div>    
                 ):(
                <p></p>
            )}        
            </div>
        )
    }
}
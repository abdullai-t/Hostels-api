import React, { Component } from 'react'
import {Pie} from 'react-chartjs-2';
import axios from 'axios';



export default class UsersPerYearGroup extends Component {
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
        const {userChart} = this.state.data
      
        return (
            <div>
            {!this.state.isLoading ?(
                <div>
                <Pie data={{
                    labels: [
                        '1st year',
                        '2nd year',
                        '3rd year',
                        '4th year'
                    ],
                    datasets: [{
                        data: [userChart.one,userChart.two,userChart.three,userChart.four],
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
                 <h3  style={{textAlign:'center'}}>Distribution Users by year Group</h3> 
                 </div>    
                 ):(
                <p></p>
            )}        
            </div>
        )
    }
}
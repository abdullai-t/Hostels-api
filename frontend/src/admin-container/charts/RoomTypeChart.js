import React, { Component } from 'react'
import {Pie} from 'react-chartjs-2';

const data = {
	labels: [
		'1 in 1',
		'2 in 1',
        '3 in 1',
        '4 in 1'
	],
	datasets: [{
		data: [78,100,200,150],
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
};


export default class HostelsPerLocation extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:[]
        }
    }
    componentDidMount(){
        this.setState({data:this.props.rooms})
        // console.log(this.state.data)
    }
    
    render() {
      
        return (
            <div>
             <Pie data={data} />     
             <h3  style={{textAlign:'center'}}>Distribution By Room Type</h3>         
            </div>
        )
    }
}
import React, { Component } from 'react'
import {Pie} from 'react-chartjs-2';

const data = {
	labels: [
		'Year 1',
		'year 2',
        'year 3',
        'year 4'
	],
	datasets: [{
		data: [300, 50, 100, 90],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
        '#FFCE56',
        '#36A2EB',
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
        '#FFCE56',
        '#36A2EB',
		]
	}]
};


export default class HostelsPerLocation extends Component {
    render() {
        return (
            <div>
             <Pie data={data} />     
             <h3  style={{textAlign:'center'}}>Distribution By year Group</h3>         
            </div>
        )
    }
}


// export default class PieCart extends React.createClass{

//   render() {
//     return (
//       <div>
//         <h2>Pie Example</h2>
//         <Pie data={data} />
//       </div>
//     );
//   }
// }
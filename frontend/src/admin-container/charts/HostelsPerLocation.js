import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2';
import Axios from 'axios';


export default class HostelsPerLocation extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       hostels:[], isLoading:true,
       data:{
        labels: [],
        datasets: [
          {
            label: 'Hostels In various Location',
            backgroundColor: '#FF6384',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: []
          }
        ]
      }

    }
  }
  
  componentDidMount() {
    let labels=[]
    let data=[]

    Axios.get(`http://127.0.0.1:8000/api-admin/hostel-location/`)
        .then(res=>{
          this.setState({hostels:res.data.hostels, isLoading:false})
          this.state.hostels.map(hostel=>{
            labels.push(hostel.location__name)
            data.push(hostel.location__count)
          })

          var newData = {...this.state.data}
          newData.labels = labels;
          newData.datasets[0].data = data

          this.setState({data:newData})
        })
        .catch()
  }
    render() {
        return (
            <div>
              {!this.state.isLoading ?
              (
                <Bar
                    data={this.state.data}
                    width='80%'
                    height='90%'
                    />
              )
            :
            (
              <p></p>
            )}
            </div>
        )
    }
}


// export default React.createClass({
//   displayName: 'BarExample',

//   render() {
//     return (
//       <div>
//         <h2>Bar Example (custom size)</h2>
//         <Bar
//           data={data}
//           width={100}
//           height={50}
//           options={{
//             maintainAspectRatio: false
//           }}
//         />
//       </div>
//     );
//   }
// });
import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2';
import Axios from 'axios';




export default class UserPerHostel extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       users:[], isLoading:true,
       data:{
        labels: [],
        datasets: [
          {
            label: 'User in varios Hostels',
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

    Axios.get(`http://127.0.0.1:8000/api-admin/user-hostel/`)
        .then(res=>{
          this.setState({users:res.data.users, isLoading:false})
          this.state.users.map(user=>{
            labels.push(user.room__hostel__name)
            data.push(user.user__count)
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
import React, { Component } from 'react'
import axios from 'axios'
import { Dropdown, Modal, Button, Header, Form } from 'semantic-ui-react'


export default class create extends Component {

    constructor(props) {
        super(props)
        this.fileInput = React.createRef();
        this.state = {
            options : [
                { key: 1, text: 'Add User', value: 1 },
                { key: 2, text: 'Add Location', value: 2 },
                { key: 3, text: 'Add Hostel', value: 3 },
                { key: 4, text: 'Add Room', value: 4 },
              ],
             userOpen:false,locationOpen:false, roomOpen:false, hostelOpen:false,
             locDescrip:'', locName:'', locImage:null,
             fname: '', lname: '', username: '', contact: '', year: '', password: '', password2: '', email: '',
             location:'', locData:[], isLoading:true, hostelData:[], hostLoading:true, room:'',
             
             
             
        }
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/api-hostels/locations/`)
            .then(res=>{this.setState({locData:res.data, isLoading:false})})
            .catch(err=>{console.log(err)})

        axios.get(`http://127.0.0.1:8000/api-hostels/hostels/`)
            .then(res=>{this.setState({hostelData:res.data, hostLoading:false})})
            .catch()
    }


    handleChange = (selected, data)=>{
        if (data.value == "1") {
            this.setState({userOpen:true, locationOpen:false, roomOpen:false, hostelOpen:false})
        }
        else if (data.value == "2") {
            this.setState({userOpen:false, locationOpen:true, roomOpen:false, hostelOpen:false})
        }
        else if (data.value == "3") {
            this.setState({userOpen:false, locationOpen:false, roomOpen:false, hostelOpen:true})
        }
        else if (data.value == "4") {
            this.setState({userOpen:false, locationOpen:false, roomOpen:true, hostelOpen:false})
        }
    }

    // adduser
    AddUser = ()=>{
        const { fname, lname, username, contact, year, email, password, password2 } = this.state
        axios.post('http://127.0.0.1:8000/api-auth/register/', {
            first_name: fname,
            last_name: lname,
            username: username,
            email: email,
            year: year,
            contact: contact,
            password: password,
            password2: password2
        })
            .then((res) => {
                if (res.data) {
                    return () => this.setState({ userOpen: false })
                }
            }

            );
    }  
    
    
    AddLocation =()=>{
        let form_data = new FormData();
        form_data.append('image', this.fileInput.current.files[0]);
        form_data.append('name', this.state.locName);
        form_data.append('description', this.state.locDescrip);
        axios.post(`http://127.0.0.1:8000/api-hostels/create/location/`, form_data,{
            headers: {
              'content-type': 'multipart/form-data'
            }
        }
        )
        .then(res=>{
            if (res.data) {
                return () => this.setState({ locationOpen: false })
            }
        })
        .catch(err=>{console.log(err)})
    }

    AddHostel =()=>{
        let form_data = new FormData();
        form_data.append('image', this.fileInput.current.files[0]);
        form_data.append('name', this.state.locName);
        form_data.append('description', this.state.locDescrip);
        form_data.append('location', this.state.location);
        console.log(this.state.location)
        axios.post(`http://127.0.0.1:8000/api-hostels/create/hostel/`, form_data,{
            headers: {
              'content-type': 'multipart/form-data'
            }
        }
        )
        .then(res=>{
            if (res.data) {
                return () => this.setState({ hostelOpen: false })
            }
        })
        .catch(err=>{console.log(err)})
    }

    AddRoom =()=>{
        let form_data = new FormData();
        form_data.append('hostel', this.state.location);
        form_data.append('room_type', this.state.room);
        form_data.append('price', this.state.contact);
        axios.post(`http://127.0.0.1:8000/api-hostels/create/room/`, form_data,{
            headers: {
              'content-type': 'multipart/form-data'
            }
        }
        )
        .then(res=>{
            if (res.data) {
                return () => this.setState({ roomOpen: false })
            }
        })
        .catch(err=>{console.log(err)})
    }


    render() {
        return (
            <div>
            <Dropdown 
            item
            text='Forms'
            options={this.state.options} 
            onChange = {this.handleChange}
            floating labeled button
            />

            {/* user creation modal */}
            <Modal size='small' open={this.state.userOpen} onClose={() => this.setState({ userOpen: false })}>
            <Header  content='User Creation form' />
                <Modal.Content>
                <Form onSubmit = {this.AddUser}>
                    <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        required
                        id='form-subcomponent-shorthand-input-first-name'
                        label='First name'
                        placeholder='First name'
                        value={this.state.fname} 
                        onChange={(event) => this.setState({ fname: event.target.value })}
                    />
                    <Form.Input
                        fluid
                        required
                        id='form-subcomponent-shorthand-input-last-name'
                        label='Last name'
                        placeholder='Last name'
                        value={this.state.lname} 
                        onChange={(event) => this.setState({ lname: event.target.value })}
                    />
                    </Form.Group>

                    <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        required
                        id='form-subcomponent-shorthand-input-first-name'
                        label='Username'
                        placeholder='username'
                        value={this.state.username} 
                        onChange={(event) => this.setState({ username: event.target.value })}
                    />
                    <Form.Input
                        fluid
                        required
                        id='form-subcomponent-shorthand-input-last-name'
                        label='Email'
                        placeholder='email'
                        value={this.state.email} 
                        onChange={(event) => this.setState({ email: event.target.value })}
                    />
                    </Form.Group>

                    <Form.Group widths='equal'>
                    <Form.Input
                        required
                        fluid
                        id='form-subcomponent-shorthand-input-first-name'
                        label='Contact'
                        placeholder='contact'
                        value={this.state.contact} 
                        onChange={(event) => this.setState({ contact: event.target.value })}
                    />
                        <div className="required field">
                            <label>Year</label>
                            <select value={this.state.year} onChange={(event) => this.setState({ year: event.target.value })}>
                                <option>select year</option>
                                <option value="1st year">1st year</option>
                                <option value="2nd year">2nd year</option>
                                <option value="3rd year">3rd year</option>
                                <option value="4th year">4th year</option>
                            </select>
                        </div>
                    </Form.Group>

                    <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        required
                        type='password'
                        id='form-subcomponent-shorthand-input-first-name'
                        label='password'
                        placeholder='Password'
                        value={this.state.password} 
                        onChange={(event) => this.setState({ password: event.target.value })}
                    />
                    <Form.Input
                        fluid
                        required
                        type='password'
                        id='form-subcomponent-shorthand-input-last-name'
                        label='confirm password'
                        placeholder='confirm password'
                        value={this.state.password2} 
                        onChange={(event) => this.setState({ password2: event.target.value })}
                    />
                     
                    </Form.Group>

                    <Form.Button>Submit</Form.Button>
                </Form>

                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => this.setState({ userOpen: false })} negative>
                        close
                    </Button>
                </Modal.Actions>
            </Modal>


            {/* location creation */}

            <Modal size='small' open={this.state.locationOpen} onClose={() => this.setState({ locationOpen: false })}>
            <Header  content='Location Creation form' />
                <Modal.Content>
                <Form onSubmit = {this.AddLocation}>
                <Form.Input
                        fluid
                        required
                        id='form-subcomponent-shorthand-input-first-name'
                        label='Location Name'
                        placeholder='location name'
                        value={this.state.locName} 
                        onChange={(event) => this.setState({ locName: event.target.value })}
                    />

                <Form.TextArea 
                label='Description'
                value={this.state.locDescrip} 
                onChange={(event) => this.setState({ locDescrip: event.target.value })}
                placeholder='Tell us more about location...' 
                />
                 <input type="file" ref={this.fileInput} />

                    <Form.Button style={{marginTop:'1%'}}>Submit</Form.Button>
                </Form>

                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => this.setState({ locationOpen: false })} negative>
                        close
                    </Button>
                </Modal.Actions>
            </Modal>



            {/* Hostel creaction */}
            <Modal size='small' open={this.state.hostelOpen} onClose={() => this.setState({ hostelOpen: false })}>
            <Header  content='Hostel Creation form' />
                <Modal.Content>
                <Form onSubmit = {this.AddHostel}>

                <div className="required field">
                            <label>Location</label>
                            <select value={this.state.location} onChange={(event) => this.setState({ location: event.target.value })}>
                                <option>location of hostel</option>
                                {!this.state.isLoading ?(
                                    this.state.locData.map(loc=>{
                                        return(
                                        <option value={loc.name} key={loc.id}>{loc.name}</option>
                                        )
                                    })
                                ):(<p></p>)}
                                

                            </select>
                        </div>


                <Form.Input
                        fluid
                        required
                        id='form-subcomponent-shorthand-input-first-name'
                        label='Hostel Name'
                        placeholder='Hostel name'
                        value={this.state.locName} 
                        onChange={(event) => this.setState({ locName: event.target.value })}
                    />
                <Form.Input
                        fluid
                        required
                        id='form-subcomponent-shorthand-input-first-name'
                        label='contact'
                        placeholder='contact'
                        value={this.state.contact} 
                        onChange={(event) => this.setState({contact: event.target.value })}
                    />

                <Form.TextArea 
                label='Description'
                value={this.state.locDescrip} 
                onChange={(event) => this.setState({ locDescrip: event.target.value })}
                placeholder='Tell us more about location...' 
                />
                 <input type="file" ref={this.fileInput} />


                    <Form.Button style={{marginTop:'1%'}}>Submit</Form.Button>
                </Form>

                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => this.setState({ hostelOpen: false })} negative>
                        close
                    </Button>
                </Modal.Actions>
            </Modal>



            {/* Room creattion */}
            <Modal size='small' open={this.state.roomOpen} onClose={() => this.setState({ roomOpen: false })}>
            <Header  content='Room Creation form' />
                <Modal.Content>
                <Form onSubmit = {this.AddRoom}>
                <div className="required field">
                    <label>Hostel</label>
                    <select value={this.state.location} onChange={(event) => this.setState({ location: event.target.value })}>
                        <option>hostel of room</option>
                        {!this.state.hostLoading ?(
                            this.state.hostelData.map(host=>{
                                return(
                                <option value={host.name} key={host.id}>{host.name}</option>
                                )
                            })
                        ):(<p></p>)}
                    </select> 
                </div>

                <div className="required field">
                    <label>Room Type</label>
                    <select value={this.state.room} onChange={(event) => this.setState({ room: event.target.value })}>
                        <option>select room</option>
                        <option value="1 in 1">1 in 1</option>
                        <option value="2 in 1">2 in 1</option>
                        <option value="3 in 1">3 in 1</option>
                        <option value="4 in 1">4 in 1</option>
                    </select>
                </div>

                <Form.Input
                        fluid
                        required
                        id='form-subcomponent-shorthand-input-first-name'
                        label='Amount'
                        placeholder='Amount'
                        value={this.state.contact} 
                        onChange={(event) => this.setState({contact: event.target.value })}
                    />

                    <Form.Button>Submit</Form.Button>
                </Form>

                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => this.setState({ roomOpen: false })} negative>
                        close
                    </Button>
                </Modal.Actions>
            </Modal>
            </div>
        )
    }
}


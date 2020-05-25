import React, { Component } from 'react'
import { Button, Grid, Image, Modal, Form, Divider } from 'semantic-ui-react'
import axios from 'axios'

export default class Settings extends Component {
    constructor(props) {
        super(props)

        this.fileInput = React.createRef();
        this.state = {
             open:false,
             userData:[], isLoading:true,
             oldPass:'', pass:'', cPass:'',
             message:''
        }
    }

    componentDidMount(){

        axios.get(`http://127.0.0.1:8000/api-auth/account/settings/`, {headers:{
            'Authorization': `Token ${localStorage.getItem('token')}`
        }})
            .then(res=>{
                this.setState({userData:res.data.user_info, isLoading:false})
                console.log(this.state.message)
            })
        this.setState({open:this.props.open})
    }

    changePassword =()=>{
        const {cPass, pass, oldPass} = this.state
        let form_data = new FormData();
        form_data.append('old_password',oldPass )
        form_data.append('new_password1', pass)
        form_data.append('new_password2', cPass)
        axios.post(`http://127.0.0.1:8000/api-auth/password/change/`,form_data, {headers:{
            'Authorization': `Token ${localStorage.getItem('token')}`
        }})
        .then(res=>{
            this.setState({message:res.data.success})
            console.log(this.state.message)
        })
        .catch(err=>{this.setState({message:err.data.failure})})

    }

    updateProfile = ()=>{
        let form_data = new FormData();
        form_data.append('avatar', this.fileInput.current.files[0]);

        axios.post(`http://127.0.0.1:8000/api-auth/account/settings/`, form_data, {headers:{
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data'
        }})
        .then(res=>{
            this.setState({message:res.data.success})
            // console.log(this.state.message)
    })
        .catch(err=>{this.setState({message:err.data.failure})})
    }
    
    render() {
        
        const {name, avatar, email, contact} = this.state.userData
        return (
            <div>
                  <Modal size='small' open={this.state.open} onClose={() => this.setState({ open: false })}>
                        <Modal.Header>Account Settings</Modal.Header>
                        <Modal.Content>

                            <Grid columns={2} stackable >

                                <Grid.Row verticalAlign='middle'>
                                    <Grid.Column>
                                        {!this.state.isLoading ?(
                                            <div>
                                                <Image wrapped rounded size='medium' src={`http://127.0.0.1:8000${avatar}`} />
                                                <div style={{fontFamily:'verdata', marginTop:'2%'}}>
                                                <h2>Name: {name}</h2>
                                                <p>Email: {email}</p>
                                                <p>Contact: {contact}</p>
                                                </div>

                                             </div>
                                      
                                        ):(
                                            <p></p>
                                        )}
                                    

                                    </Grid.Column>

                                    <Grid.Column>

                                    <Divider horizontal>Change profile image</Divider>
                                    <Form onSubmit = {this.updateProfile}>

                                       <Form.Field>
                                       <input type="file" ref={this.fileInput} />
                                       </Form.Field>
                                        
                                        <Button type='submit'>Submit</Button>
                                    </Form>


                                    <Divider horizontal>Change Password</Divider>

                                    <Form onSubmit={this.changePassword}>
                                        <Form.Field>
                                        <input placeholder='Old passwod'
                                            type='password'
                                            value={this.state.oldPass} 
                                            onChange={(event) => this.setState({ oldPass: event.target.value })}
                                         />
                                        </Form.Field>

                                        <Form.Field>
                                            <input placeholder='New password'
                                                type='password'
                                                value={this.state.pass} 
                                                onChange={(event) => this.setState({ pass: event.target.value })}
                                            />
                                        </Form.Field>

                                        <Form.Field>
                                        <input placeholder='Confirm New password' 
                                            value={this.state.cPass} 
                                            type='password'
                                            onChange={(event) => this.setState({ cPass: event.target.value })}   
                                        />
                                        </Form.Field>

                                        <Button type='submit'>Change password</Button>
                                    </Form>

                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                    
                        </Modal.Content>

                        <Modal.Actions>
                            <Button onClick={() => this.setState({ open: false })} negative>
                                close
                            </Button>
                        </Modal.Actions>
                    </Modal>
            </div>
        )
    }
}



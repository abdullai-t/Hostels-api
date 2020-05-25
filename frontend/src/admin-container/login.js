import React, { Component } from 'react'
import axios from 'axios'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

export default class login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             username:'',
             password:'',
             token:'',
             error:''
        }
    }


    handleSubmit = (event) => {

        const { username, password } = this.state

        axios.post('http://127.0.0.1:8000/api-admin/admin-login/', {

            username: username,
            password: password,
        })
            .then(res => {
                this.setState({ token: res.data.token })
                if (res.data.token) {
                    this.props.history.push({
                        pathname: '/admin/dashboard',
                        token: this.state.token
                    })
                    localStorage.setItem('token', this.state.token);
                }
            })
            .catch(err=>{this.setState({error:err.error})})
        event.preventDefault();

    }
    
    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                 Admin Log-in 
              </Header>
             <p>{this.state.error}</p>
              <Form size='large' onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input 
                     fluid icon='user'
                     iconPosition='left' 
                     placeholder='username' 
                     value={this.state.username} 
                     onChange={(event) => this.setState({username: event.target.value })}
                     />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={this.state.password} 
                    onChange={(event) => this.setState({password: event.target.value })}
                  />
        
                  <Button color='teal' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>

            </Grid.Column>
          </Grid>
        )
    }
}

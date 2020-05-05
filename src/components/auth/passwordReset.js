import React from 'react'
import { useState } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import axios from 'axios'


const PasswordResetModal = () => {
    const [email, setEmail] = useState('');

    const sendEmail = () => {
        axios.post(`http://127.0.0.1:8000/api-auth/password/reset/`, {
            email: email
        })
            .then(() => this.props.history.push({ pathname: '/login', }))
            .catch(err => console.log(err))

    }
    return (
        <Modal size="small" trigger={<Button>Forgot password ?</Button>} closeIcon>
                <Header content=' Enter Your Email to reset your Password' />
                <Modal.Content>
                    <div class="ui left fluid  input">
                        <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    </div>

                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={sendEmail}>
                        submit
                    </Button>
                </Modal.Actions>
        </Modal>
    )
}

export default PasswordResetModal


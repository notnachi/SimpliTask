import React, {useState} from 'react'
import '../Form.css'
import {NavLink} from 'react-router-dom'
import {APIURL, APIKey} from '../constants'
import axios from 'axios'

export const UpdatePassword = (props) => {

    const changePasswordURL = APIURL + 'changepassword'

    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [message, setMessage] = useState('');


    const submitHandler = (e) => {
        e.preventDefault();
        

        const requestConfig = {
            headers: {
                'x-api-key': APIKey
            }
        }

        const requestBody = {
            username: username,
            newPassword: newPassword
        }


        axios.post(changePasswordURL, requestBody, requestConfig).then(response => {
            props.history.push('/login');
        }).catch((error) => {
            if(error.response.status === 401 || error.response.status === 403){
                setMessage(error.response.data.message);
            } else{
                setMessage('sorry some issue with the server');
            }
        })

        

    }
    return (


        <div className="login-form">
        <form onSubmit = {submitHandler}>
            <div className="img-div">
                <img src="/images/to-do.png" alt="Todoist" />
            </div>
            <h2 className="text-center">Change Password</h2>     
            <div className="form-group">
                <input type="text" value = {username} onChange = {e => setUsername(e.target.value)} className="form-control" placeholder="Enter username" required="required" />
            </div>
            <div className="form-group">
                <input type="password" value = {newPassword} onChange = {e => setNewPassword(e.target.value)} className="form-control" placeholder="New Password" required="required" />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Change Password</button>
            </div> 
            <div className="clearfix">
                {message && <p className = "text-center">{message}</p>}
            </div> 
        </form>
        <p className="text-center"><NavLink to = "/login">Go Back</NavLink></p>
    </div>
        
    )
}

import React, {useState} from 'react'
import '../Form.css'
import {NavLink} from 'react-router-dom'
import {APIURL, APIKey} from '../constants'
import axios from 'axios'
import { getUser } from '../auth/authService';

export const ChangePassword = () => {

    const updatePasswordURL = APIURL + 'updatepassword'

    const [currentPassword, setCurrentPassword] = useState('');
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
            username: getUser().username,
            currentPassword: currentPassword,
            newPassword: newPassword
        }


        axios.post(updatePasswordURL, requestBody, requestConfig).then(response => {
            setMessage('Password updated successfully');
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
            <h2 className="text-center">Update Password</h2>     
            <div className="form-group">
                <input type="password" value = {currentPassword} onChange = {e => setCurrentPassword(e.target.value)} className="form-control" placeholder="Current Password" required="required" />
            </div>
            <div className="form-group">
                <input type="password" value = {newPassword} onChange = {e => setNewPassword(e.target.value)} className="form-control" placeholder="New Password" required="required" />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Update Password</button>
            </div> 
            <div className="clearfix">
                {message && <p className = "text-center">{message}</p>}
            </div> 
        </form>
        <p className="text-center"><NavLink to = "/">Go Back</NavLink></p>
    </div>
        
    )
}

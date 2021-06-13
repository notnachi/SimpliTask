import React, {useState} from 'react'
import '../Form.css'
import {NavLink} from 'react-router-dom'

export const ChangePassword = () => {

    const [oldPassword, setoldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [message, setMessage] = useState('');


    const submitHandler = (e) => {
        e.preventDefault();
        console.log("form submitted");
    }


    return (

        <div className="login-form">
        <form onSubmit = {submitHandler}>
            <h2 className="text-center">Update Password</h2>     
            <div className="form-group">
                <input type="password" value = {oldPassword} onChange = {e => setoldPassword(e.target.value)} className="form-control" placeholder="Old Password" required="required" />
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

import React, {useState} from 'react'
import axios from 'axios';
import {NavLink} from 'react-router-dom'
import '../Form.css'
import {APIURL, APIKey} from '../constants'

export const Register = (props) => {
    const registerAPIURL = APIURL + 'register'

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");


    const submitHandler = (e) => {
        e.preventDefault();

        if(name.trim() === '' || username.trim() === '' || email.trim() === '' || password.trim() === ''){
            setMessage("All fields are required")
            return;
        }
        console.log("Submit button has been clicked");


        const requestConfig = {
            headers: {
                'x-api-key': APIKey
            }
        }

        const requestBody = {
            username: username,
            email: email,
            name: name,
            password: password
        }


        axios.post(registerAPIURL, requestBody, requestConfig).then(response => {
            setMessage('Registration successful');
            props.history.push('/login');
        }).catch(error => {
            console.log(error);
            if(error.response.status === 401){
                setMessage(error.response.data.message);
            }else{
                setMessage('Sorry. Some problem with server');
            }
        })

        
    }

    return (

        <div className="login-form">
        <form onSubmit = {submitHandler}>
            <h2 className="text-center">Register</h2>     
            <div className="form-group">
                <input type="text" value = {name} onChange = {e => setName(e.target.value)}  className="form-control" placeholder="Name" required="required" />
            </div>
            <div className="form-group">
                <input type="email" value = {email} onChange = {e => setEmail(e.target.value)}  className="form-control" placeholder="Email ID" required="required" />
            </div>  
            <div className="form-group">
                <input type="text" value = {username} onChange = {e => setUsername(e.target.value)}  className="form-control" placeholder="Username" required="required" />
            </div>
            <div className="form-group">
                <input type="password" value = {password} onChange = {e => setPassword(e.target.value)} className="form-control" placeholder="Password" required="required" />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Register</button>
            </div> 
            <div className="clearfix">
                {message && <p className = "text-center">{message}</p>}
            </div> 
        </form>
        <p className="text-center"><NavLink to = "/login">Go Back</NavLink></p>
    </div>
        
    )
}

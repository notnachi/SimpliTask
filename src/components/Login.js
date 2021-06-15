import React, {useState} from 'react'
import axios from 'axios';
import {setUserSession} from '../auth/authService'
import {NavLink} from 'react-router-dom'
import '../Form.css'
import {APIURL, APIKey} from '../constants'

export const Login = (props) => {

    const loginApiUrl = APIURL + 'login'
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const submitHandler = (e) => {
        e.preventDefault()

        console.log(username, password);

        console.log("Submit button has been clicked");

        if(username.trim() === '' || password.trim() === ''){
            setMessage("All fields are required")
            return;
        }

        const requestConfig = {
            headers: {
                'x-api-key': APIKey
            }
        }

        const requestBody = {
            username: username,
            password: password
        }

        axios.post(loginApiUrl, requestBody, requestConfig).then(response => {
                setUserSession(response.data.user, response.data.token);
                props.history.push('/');
            }).catch((error) => {
                if(error.response.status === 401 || error.response.status === 403){
                    setMessage(error.response.data.message);
                } else{
                    setMessage('sorry some issue with the server');
                }
            })
    }


    return (

    <div className="login-form justify-content-center">
        <form onSubmit = {submitHandler}>
            <div className="img-div">
                <img src="/images/to-do.png" alt="Todoist" />
            </div>
            
            <h2 className="text-center">Log in</h2>       
            <div className="form-group">
                <input type="text" value = {username} onChange = {e => setUsername(e.target.value)}  className="form-control" placeholder="Username" required="required" />
            </div>
            <div className="form-group">
                <input type="password" value = {password} onChange = {e => setPassword(e.target.value)} className="form-control" placeholder="Password" required="required" />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Log in</button>
            </div>  
            <div className="clearfix">
                {message && <p className = "text-center">{message}</p>}
            </div> 
        </form>
        <p className="text-center"><NavLink to = "/register">Register</NavLink></p>
        <p className="text-center"><NavLink to = "/update_password">Forgot Password?</NavLink></p>
    </div>
      
    )
}

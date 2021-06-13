import {useEffect} from 'react';
import {Content} from './components/layouts/Content'
import {BrowserRouter as Router, Redirect} from 'react-router-dom'
import { Login } from './components/Login';
import {getUser, getToken,setUserSession, resetUserSession} from './auth/authService'
import axios from 'axios';
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import { Register } from './components/Register';
import {APIURL, APIKey} from './constants'
import { ChangePassword } from './components/ChangePassword';
import { UpdatePassword } from './components/UpdatePassword';

export const App = () => {

  

  const verifyAPIURL = APIURL + 'verify'

  useEffect(() => {

    let redirect = false;
    const verifyUser = async () => {

      console.log('Rendering app again');
      console.log(JSON.stringify(getUser()));

        const token = getToken();

        if(token === 'undefined' || token === undefined || token === null || !token){
          console.log("Now redirecting to login page");
          return <Redirect to ={{pathname: '/login'}} />
        }

        const requestConfig = {
          headers: {
              'x-api-key': APIKey
          }
        }

        const requestBody = {
          user: getUser(),
          token: token
        }

        console.log(JSON.stringify(requestBody))

        await axios.post(verifyAPIURL, requestBody, requestConfig).then((response) => {
          setUserSession(response.data.user, response.data.token)
        }).catch(() => {
          console.log('hi!! i got error')
          resetUserSession();
          window.location.reload(false);
        })

    }

    verifyUser();

  }, [])

  return (

    <div className="App">

    <Router>
        <PublicRoute path = "/login" exact component = {Login} />
        <PublicRoute path = "/register" exact component = {Register} />
        <PublicRoute path = "/update_password" exact component = {UpdatePassword} />
        <PrivateRoute path = "/" exact component = {Content} />
        <PrivateRoute path = "/change_password" exact component = {ChangePassword} />

        {/* <SelectedSubjectProvider>
          <SubjectsProvider>
            
          </SubjectsProvider>
        </SelectedSubjectProvider> */}
    </Router>
          
          
    </div>

    
    


    
  );
}

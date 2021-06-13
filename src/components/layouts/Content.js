import React, {useEffect} from 'react'
import { Redirect } from 'react-router'
import { getUser } from '../../auth/authService'
import { Tasks } from '../Tasks'
import {Header} from './Header'
import {Sidebar} from './Sidebar'
import {SubjectsProvider, SelectedSubjectProvider } from '../../context'

export const Content = (props) => {

    // useEffect(() => {
    //     if(!getUser()){
    //         <Redirect to ={{pathname: '/login'}} />
    //     }
    // }, [])

    console.log('Now rendering content component');
    return (
        <SelectedSubjectProvider>
          <SubjectsProvider>
            <div>
                <Header props = {props} />
                <Sidebar />
                <Tasks />
            </div>
          </SubjectsProvider>
        </SelectedSubjectProvider>
        
    )
}

import React, { createContext, useContext } from 'react';
import {useSubjects} from '../hooks/index'

export const SubjectsContext = createContext();

export const SubjectsProvider = ({ children }) => {
    const {subjects, setSubjects} = useSubjects();

    return (
        <SubjectsContext.Provider value={{ subjects, setSubjects }}>
          {children}
        </SubjectsContext.Provider>
      );
}


export const useSubjectsValue = () => useContext(SubjectsContext);
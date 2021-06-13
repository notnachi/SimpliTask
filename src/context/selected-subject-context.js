import React, { createContext, useContext , useState} from 'react';
import {useSubjects} from '../hooks/index'

export const SelectedSubjectContext = createContext();

export const SelectedSubjectProvider = ({ children }) => {
    const [selectedSubject, setSelectedSubject] = useState("TODAY");

    return (
        <SelectedSubjectContext.Provider value={{ selectedSubject, setSelectedSubject }}>
          {children}
        </SelectedSubjectContext.Provider>
      );
}


export const useSelectedSubjectValue = () => useContext(SelectedSubjectContext);
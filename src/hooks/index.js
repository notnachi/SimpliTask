import { useState, useEffect } from 'react';
import moment from 'moment';
import {getUser} from '../auth/authService'
import { collatedTasksExist } from '../helpers';
import {getTasks, getSubjects} from '../helpers/dynamoService'
import { Redirect } from 'react-router';

/********DYNAMO OPERATIONS ************/


export const useTasks = selectedSubject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  const user_id = getUser().username;

  const unsubscribeFunction = async () => {
    return await getTasks(user_id);
  }

  useEffect(() => {

    const someFunction = async() => {

      let unsubscribe = await unsubscribeFunction()

      unsubscribe = selectedSubject && !collatedTasksExist(selectedSubject)
          ? (unsubscribe = unsubscribe.filter((item) => {
              if(item.subject_id === selectedSubject)
                  return item
          }))
          : selectedSubject === 'TODAY'
          ? (unsubscribe = unsubscribe = unsubscribe.filter((item) => {
              if(item.date === moment().format('DD/MM/YYYY'))
                  return item
          }))
          : selectedSubject === 'TOMORROW' || selectedSubject === 0
          ? (unsubscribe = unsubscribe.filter((item) => {
              if(item.date === moment().add(1, 'day').format('DD/MM/YYYY'))
                  return item
          }))
          : unsubscribe;
      
      return unsubscribe;

    }

    someFunction().then((unsubscribe) => {
      setTasks(

        selectedSubject === 'NEXT_7'
        ? (unsubscribe = unsubscribe.filter((item) => {
            if(moment(item.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && moment(item.date, 'DD-MM-YYYY').diff(moment(), 'days') >= 0 && item.archived !== true)
                return item
        }))
        : (unsubscribe = unsubscribe.filter((item) => {
            if(item.archived !== true)
                return item
        }))
      )
        
    })

    return () => someFunction()

  }, [selectedSubject]);

  return { tasks, archivedTasks };
};

export const useSubjects = () => {

  const user_id = getUser().username;
  const [subjects, setSubjects] = useState([]);

  useEffect(async () => {

    let allSubjects = await getSubjects(user_id)

    // console.log(allSubjects)

    if (JSON.stringify(allSubjects) !== JSON.stringify(subjects)) {
      // console.log("Setting the subjects");
        setSubjects(allSubjects);
      }

  }, [subjects]);

  return { subjects, setSubjects };
};

import React, {useEffect, useState} from 'react'
import { useTasks } from '../hooks';
import {Checkbox} from './Checkbox'
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedSubjectValue, useSubjectsValue } from '../context';
import { AddTask } from './AddTask';

export const Tasks = () => {

    const { selectedSubject } = useSelectedSubjectValue();
    const { subjects } = useSubjectsValue();
    const {tasks} = useTasks(selectedSubject);

    const [newTasks, setNewTasks] = useState([]);

    const [archivedTaskID, setArchivedTaskID] = useState([])

    useEffect(() => {
        
        setNewTasks([]);
        setArchivedTaskID([]);
        
    }, [tasks])

    console.log(tasks.length);
    let subjectName = '';

    if (collatedTasksExist(selectedSubject) && selectedSubject) {
        subjectName = getCollatedTitle(collatedTasks, selectedSubject).name;
    }

    if (
        subjects &&
        subjects.length > 0 &&
        selectedSubject &&
        !collatedTasksExist(selectedSubject)
      ) {
            subjectName = getTitle(subjects, selectedSubject).subject_name;
      }

    useEffect(() => {
        document.title = `${subjectName}: Todoist`;
      });
    
      const label_style = {
          "marginLeft" : "10px"
      }
    

    return (
        <div className="tasks" data-testid="tasks">
            <h2 data-testid="project-name">{subjectName}</h2>

            <ul className="tasks__list">
                {tasks.map((task) => (
                <li key={`${task.task_id}`}>
                    {archivedTaskID.includes(task.task_id)
                    ? <span><s>{task.task_desc}</s></span>
                    : <>
                        <Checkbox id={task.task_id} setArchivedTaskID = {setArchivedTaskID} taskDesc={task.task_desc} />
                        <span>{task.task_desc}</span>
                        <span className="badge badge-info float-right" style = {label_style}>{task.date}</span>
                    </>
                    }
                </li>
                ))}
            </ul>
            
            {newTasks.length !== 0
                && <ul className="tasks__list">
                    {newTasks.map((task) => (
                    <li key={`${task.task_id}`}>
                        {archivedTaskID.includes(task.task_id)
                    ? <span><s>{task.task_desc}</s></span>
                    : <>
                        <Checkbox id={task.task_id} setArchivedTaskID = {setArchivedTaskID} taskDesc={task.task_desc} />
                        <span>{task.task_desc}</span>
                        <span class="badge badge-info float-right" style = {label_style}>{task.date}</span>
                    </>
                    }
                    </li>
                    ))}
                </ul>
            }
            <AddTask setNewTasks = {setNewTasks}/>
    </div>
    )
}

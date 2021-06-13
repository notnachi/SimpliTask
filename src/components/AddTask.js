import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment'
import {addTask} from '../helpers/dynamoService'
import { useSelectedSubjectValue } from '../context';
import { SubjectOverlay } from './SubjectOverlay';
import { TaskDate } from './TaskDate';
import { getUser } from '../auth/authService';

export const AddTask = ({
    showAddTaskMain = true,
    shouldShowMain = false,
    showQuickAddTask,
    setShowQuickAddTask,
    setNewTasks
  }) =>{


    const [task, setTask] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [subject, setSubject] = useState('');
    const [alternateSubject, setAlternateSubject] = useState('');
    const [showMain, setShowMain] = useState(shouldShowMain);
    const [showSubjectOverlay, setShowSubjectOverlay] = useState(false);
    const [showTaskDate, setShowTaskDate] = useState(false);

    const user_name = getUser().username;

    const { selectedSubject, setSelectedSubject } = useSelectedSubjectValue();

    // console.log('Subject ',subject);
    // console.log('Selected Subject ', selectedSubject);
    // console.log(subject || selectedSubject);

    const addTaskHandler = () => {

      const subjectID = subject || alternateSubject || selectedSubject;
      console.log('Subject ID ', subjectID)
      let collatedDate = '';
  
      if (subjectID === 'TODAY') {
        collatedDate = moment().format('DD/MM/YYYY');
      } else if (subjectID === 'NEXT_7') {
        collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
      }

      const newTask = {

        task_id: uuidv4(),
        archived: false,
        date: taskDate,
        subject_id: subjectID,
        task_desc: task,
        user_id: user_name

      }

      addTask(newTask).then(() => {

      setTask('');
      setSubject('');
      setShowMain('');
      setShowSubjectOverlay(false);
      setSelectedSubject(subjectID);
      setNewTasks(oldArray => [...oldArray, newTask]);

    })
      return task && subjectID;
    }

    return (
        <div
          className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
          data-testid="add-task-comp"
        >
          {showAddTaskMain && (
            <div
              className="add-task__shallow"
              data-testid="show-main-action"
              onClick={() => setShowMain(!showMain)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setShowMain(!showMain);
              }}
              tabIndex={0}
              aria-label="Add task"
              role="button"
            >
              <span className="add-task__plus">+</span>
              <span className="add-task__text">Add Task</span>
            </div>
          )}
    
          {(showMain || showQuickAddTask) && (
            <div className="add-task__main" data-testid="add-task-main">
              {showQuickAddTask && (
                <>
                  <div data-testid="quick-add-task">
                    <h2 className="header">Quick Add Task</h2>
                    <span
                      className="add-task__cancel-x"
                      data-testid="add-task-quick-cancel"
                      aria-label="Cancel adding task"
                      onClick={() => {
                        setShowMain(false);
                        setShowSubjectOverlay(false);
                        setShowQuickAddTask(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setShowMain(false);
                          setShowSubjectOverlay(false);
                          setShowQuickAddTask(false);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                    >
                      X
                    </span>
                  </div>
                </>
              )}
              <SubjectOverlay
                setSubject={setSubject}
                showSubjectOverlay={showSubjectOverlay}
                setShowSubjectOverlay={setShowSubjectOverlay}
              />
              <TaskDate
                setTaskDate={setTaskDate}
                setAlternateSubject = {setAlternateSubject}
                showTaskDate={showTaskDate}
                setShowTaskDate={setShowTaskDate}
              />
              <input
                className="add-task__content"
                aria-label="Enter your task"
                data-testid="add-task-content"
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <button
                type="button"
                className="add-task__submit"
                data-testid="add-task"
                onClick={() =>
                  showQuickAddTask
                    ? addTaskHandler() && setShowQuickAddTask(false)
                    : addTaskHandler()
                }
              >
                Add Task
              </button>
              {!showQuickAddTask && (
                <span
                  className="add-task__cancel"
                  data-testid="add-task-main-cancel"
                  onClick={() => {
                    setShowMain(false);
                    setShowSubjectOverlay(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setShowMain(false);
                      setShowSubjectOverlay(false);
                    }
                  }}
                  aria-label="Cancel adding a task"
                  tabIndex={0}
                  role="button"
                >
                  Cancel
                </span>
              )}
              <span
                className="add-task__project"
                data-testid="show-project-overlay"
                onClick={() => setShowSubjectOverlay(!showSubjectOverlay)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setShowSubjectOverlay(!showSubjectOverlay);
                }}
                tabIndex={0}
                role="button"
              >
                <FaRegListAlt />
              </span>
              <span
                className="add-task__date"
                data-testid="show-task-date-overlay"
                onClick={() => setShowTaskDate(!showTaskDate)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setShowTaskDate(!showTaskDate);
                }}
                tabIndex={0}
                role="button"
              >
                <FaRegCalendarAlt />
              </span>
            </div>
          )}
        </div>
      );


  }


import React, {useState} from 'react';
import moment from 'moment';
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa';




export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate, setAlternateSubject}) => {

  let taskDate = '';

  let dateSet = false;

  
  const changeHandler = (e) => {

    e.preventDefault();
    console.log('Date', e.target.value);

    const date = new Date(e.target.value);

    const correctMonth = date.getMonth()+1

    taskDate = date.getDate() + "/" + correctMonth + "/" + date.getFullYear()

    console.log('Task date ', taskDate)
    // setShowTaskDate(false);
    setAlternateSubject('ALL_TASKS')
    setTaskDate(taskDate);

  }


  return showTaskDate && (
    <div className="task-date" data-testid="task-date-overlay">
      <ul className="task-date__list">
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setAlternateSubject('TODAY')
              setTaskDate(moment().format('DD/MM/YYYY'));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowTaskDate(false);
                setAlternateSubject('TODAY')
                setTaskDate(moment().format('DD/MM/YYYY'));
              }
            }}
            data-testid="task-date-today"
            tabIndex={0}
            aria-label="Select today as the task date"
            role="button"
          >
            <span>
              <FaSpaceShuttle />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setAlternateSubject('TOMORROW')
              setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowTaskDate(false);
                setAlternateSubject('TOMORROW')
                setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
              }
            }}
            data-testid="task-date-tomorrow"
            role="button"
            tabIndex={0}
            aria-label="Select tomorrow as the task date"
          >
            <span>
              <FaSun />
            </span>
            <span>Tomorrow</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setAlternateSubject('NEXT_7')
              setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowTaskDate(false);
                setAlternateSubject('NEXT_7')
                setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
              }
            }}
            data-testid="task-date-next-week"
            aria-label="Select next week as the task date"
            tabIndex={0}
            role="button"
          >
            <span>
              <FaRegPaperPlane />
            </span>
            <span>Next week</span>
          </div>
        </li>
        <li>
          <div>
            <input type="date" onChange = {changeHandler}/>
          </div>
        </li>
      </ul>
    </div>
  );

}
  
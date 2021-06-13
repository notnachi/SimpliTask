import React, {useState} from 'react'
import { FaSignOutAlt } from 'react-icons/fa';
import { FaUserCog } from 'react-icons/fa';
import { AddTask } from '../AddTask';
import { resetUserSession } from '../../auth/authService';
import {NavLink} from 'react-router-dom'

export const Header = (props) => {
    const [shouldShowMain, setShouldShowMain] = useState(false);
    const [showQuickAddTask, setShowQuickAddTask] = useState(false);


    const logOutHandler = (e) => {

        e.preventDefault();
        resetUserSession();
        window.location.reload(false);

    }

    return (
        <header className="header" data-testid="header">
        <nav>
            <div className="logo">
                <img src="/images/to-do.png" alt="Todoist" />
                SimpliTask
            </div>
            <div className="settings">
            <ul>
                <li className="settings__add">
                <NavLink to = "/change_password"><FaUserCog /></NavLink>
                </li>
                <li className="settings__darkmode">
                <button
                    data-testid="dark-mode-action"
                    aria-label="Darkmode on/off"
                    type="button"
                    onClick={logOutHandler}
                >
                    <FaSignOutAlt />
                </button>
                </li>
            </ul>
            </div>
        </nav>

        <AddTask
            showAddTaskMain={false}
            shouldShowMain={shouldShowMain}
            showQuickAddTask={showQuickAddTask}
            setShowQuickAddTask={setShowQuickAddTask}
        />
    </header>
    )
}

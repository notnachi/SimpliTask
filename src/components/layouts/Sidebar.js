import React, {useState} from 'react';
import {
    FaChevronDown,
    FaInbox,
    FaRegCalendarAlt,
    FaRegCalendar,
  } from 'react-icons/fa';

import {useSelectedSubjectValue} from '../../context'
import { AddSubject } from '../AddSubject';
import { Subjects } from '../Subjects';

export const Sidebar = () => {

    const { setSelectedSubject } = useSelectedSubjectValue();
    const [active, setActive] = useState('TODAY');
    const [showSubjects, setShowSubjects] = useState(true);

    return (
        <div className="sidebar" data-testid="sidebar">
            <ul className="sidebar__generic">
                {/* <li
                data-testid="inbox"
                className={active === 'inbox' ? 'active' : undefined}
                >
                <div
                    data-testid="inbox-action"
                    aria-label="Show inbox tasks"
                    tabIndex={0}
                    role="button"
                    onClick={() => {
                    setActive('inbox');
                    setSelectedSubject('INBOX');
                    }}

                >
                    <span>
                    <FaInbox />
                    </span>
                    <span>Inbox</span>
                </div>
                </li> */}
                <li
                data-testid="today"
                className={active === 'today' ? 'active' : undefined}
                >
                <div
                    data-testid="today-action"
                    aria-label="Show today's tasks"
                    tabIndex={0}
                    role="button"
                    onClick={() => {
                    setActive('today');
                    setSelectedSubject('TODAY');
                    }}
                >
                    <span>
                    <FaRegCalendar />
                    </span>
                    <span>Today</span>
                </div>
                </li>
                <li
                data-testid="next_7"
                className={active === 'next_7' ? 'active' : undefined}
                >
                <div
                    data-testid="next_7-action"
                    aria-label="Show tasks for the next 7 days"
                    tabIndex={0}
                    role="button"
                    onClick={() => {
                    setActive('next_7');
                    setSelectedSubject('NEXT_7');
                    }}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setActive('next_7');
                        setSelectedSubject('NEXT_7');
                    }
                    }}
                >
                    <span>
                    <FaRegCalendarAlt />
                    </span>
                    <span>Next 7 days</span>
                </div>
                </li>
            </ul>
            <div
                className="sidebar__middle"
                aria-label="Show/hide projects"
                onClick={() => setShowSubjects(!showSubjects)}
                onKeyDown={(e) => {
                if (e.key === 'Enter') setShowSubjects(!showSubjects);
                }}
                role="button"
                tabIndex={0}
            >
                <span>
                <FaChevronDown
                    className={!showSubjects ? 'hidden-projects' : undefined}
                />
                </span>
                <h2>Subjects</h2>
            </div>

            <ul className="sidebar__projects">{showSubjects && <Subjects />}</ul>

            {showSubjects && <AddSubject />}
    </div>

        
    )
}

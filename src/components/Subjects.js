import React, { useState } from 'react';
import {useSelectedSubjectValue, useSubjectsValue} from '../context';
import { Subject } from './Subject';

export const Subjects = ({activeValue = null}) => {
    const [active, setActive] = useState(activeValue);
    const { setSelectedSubject } = useSelectedSubjectValue();
    const { subjects } = useSubjectsValue();



    return (
        subjects.map((subject) => {
            return <li
            key={subject.subject_id}
            className={
              active === subject.subject_id
                ? 'active sidebar__project'
                : 'sidebar__project'
            }
          >
            <div
              role="button"
              data-testid="project-action"
              tabIndex={0}
              aria-label={`Select ${subject.subject_name} as the task project`}
              onClick={() => {
                setActive(subject.subject_id);
                setSelectedSubject(subject.subject_id);
              }}
            >
              <Subject subject = {subject} />
            </div>
          </li>
        })
    )
    

}
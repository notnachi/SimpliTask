import React from 'react';
import { useSubjectsValue } from '../context';

export const SubjectOverlay = ({
    setSubject,
    showSubjectOverlay,
    setShowSubjectOverlay,
  }) => {
      const {subjects} = useSubjectsValue();


      return (
        subjects &&
        showSubjectOverlay && (
          <div className="project-overlay" data-testid="project-overlay">
            <ul className="project-overlay__list">
              {subjects.map((subject) => (
                <li key={subject.subject_id}>
                  <div
                    data-testid="project-overlay-action"
                    onClick={() => {
                      setSubject(subject.subject_id);
                      setShowSubjectOverlay(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setSubject(subject.subject_id);
                        setShowSubjectOverlay(false);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Select the task project"
                  >
                    {subject.subject_name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      );
  }
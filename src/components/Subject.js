import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useSubjectsValue, useSelectedSubjectValue } from '../context';
import {removeSubject} from '../helpers/dynamoService'

export const Subject = ({subject}) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const { subjects, setSubjects } = useSubjectsValue();
    const { setSelectedSubject } = useSelectedSubjectValue();

    const deleteSubject = async(subject_id) => {
        await removeSubject(subject_id).then(() => {

            setSubjects([...subjects]);
            setSelectedSubject("TODAY");

        })
    }


    return (
        <>
            <span className="sidebar__dot">•</span>
            <span className="sidebar__project-name">{subject.subject_name}</span>
            <span className="sidebar__project-delete"
                data-testid="delete-project"
                onClick={() => setShowConfirm(!showConfirm)}
                tabIndex={0}
                role="button"
                aria-label="Confirm deletion of project">
                    <FaTrashAlt />   
                    {showConfirm && (
                        <div className="project-delete-modal">
                            <span className="project-delete-modal__inner">
                            <p>Are you sure you want to delete this project?</p>
                            <button
                                type="button"
                                onClick={() => deleteSubject(subject.subject_id)}
                            >
                                Delete
                            </button>
                            <span
                                onClick={() => setShowConfirm(!showConfirm)}
                                onKeyDown={(e) => {
                                if (e.key === 'Enter') setShowConfirm(!showConfirm);
                                }}
                                tabIndex={0}
                                role="button"
                                aria-label="Cancel adding project, do not delete"
                            >
                                Cancel
                            </span>
                            </span>
                        </div>
                    )}
             </span>
        </>
    )

}
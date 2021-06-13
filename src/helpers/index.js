import { collatedTasks } from '../constants';

export const collatedTasksExist = selectedSubject =>
  collatedTasks.find(task => task.key === selectedSubject);

export const getTitle = (subjects, subject_id) => {

  // console.log('subjects', subjects);
  // console.log('subject id',subject_id);

  return subjects.find(subject => subject.subject_id === subject_id)

}
  

export const getCollatedTitle = (subjects, key) =>
  subjects.find(subject => subject.key === key);
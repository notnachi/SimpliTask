import React from 'react'
import {archiveTask} from '../helpers/dynamoService'

export const Checkbox = ({id, taskDesc, setArchivedTaskID}) => {


  const clickHandler =  async (e) => {

    // e.preventDefault();

    console.log("checkbox has been clicked");

    await archiveTask(id).then(() => {

      setArchivedTaskID(oldArray => [...oldArray, id]);
      
    });
  }
    return (
    //   <div
    //     className="checkbox-holder"
    //     data-testid="checkbox-action"
    //     onClick={() => clickHandler}
    //     aria-label={`Mark ${taskDesc} as done?`}
    //     role="button"
    //     tabIndex={0}
    //   >
    //     <span className="checkbox" />
    // </div>

      <div className="checkbox-holder">
        <input type="checkbox" onClick = {clickHandler}/>
      </div>
    )
}

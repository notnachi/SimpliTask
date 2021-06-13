import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import {subjects_table, tasks_table, AWSParams} from '../constants'

AWS.config.update(AWSParams)

const dynamodb = new AWS.DynamoDB.DocumentClient();
// const subjects_table = 'subjects';
// const tasks_table = 'tasks';

export const getTasks = async (user_id) => {
    const params = {
        TableName: tasks_table,
        FilterExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": user_id,
        }
      };

    return await dynamodb.scan(params).promise().then(response => {
        return response.Items
    }, error =>{
        console.error(error);
    })
}

export const getSubjects = async (user_id) => {
    const params = {
        TableName: subjects_table,
        FilterExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": user_id,
        }
      };

    return await dynamodb.scan(params).promise().then(response => {
        return response.Items
    }, error =>{
        console.error(error);
    })
}


export const archiveTask = async(task_id) => {
    let archived = true;
    const params = {
        TableName: tasks_table,
        Key: {
            task_id: task_id
        },
        UpdateExpression: "set archived = :archived",
        ExpressionAttributeValues: {
            ":archived" : archived
        }
        
      };
    
    return await dynamodb.update(params).promise()
}


export const removeSubject = async(subject_id) => {
    const params = {
        TableName: subjects_table,
        Key:{
            subject_id: subject_id
        }

    }

    return await dynamodb.delete(params).promise().then(response => {
        console.log(response);
        return response
    }, error =>{
        console.error(error);
    })
}


export const addSubject = async(subject) => {
    const params = {
        TableName: subjects_table,
        Item: {
            subject_id: uuidv4(),
            ...subject
        }
    }

    return await dynamodb.put(params).promise()
}

export const addTask = async(task) => {

    const params = {
        TableName: tasks_table,
        Item: task
    }

    return await dynamodb.put(params).promise()   
}
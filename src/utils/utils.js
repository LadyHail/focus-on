import { findFreeId, getGoal, saveGoal } from './DbHelper.js';

//TODO check data type
export function createGoalObj() {
    const description = document.getElementById('goal-desc').value;
    let expDate = document.getElementById('goal-date').value + ' ' + document.getElementById('goal-time').value;
    expDate = new Date(expDate).toUTCString();
    const id = findFreeId();
    const dateNow = new Date().toUTCString();
    const goal = { 'id': id, 'description': description, 'expDate': expDate, 'created': dateNow, 'tasks': [] };
    return goal;
}

export function createTasksObjs(tasksArray) {
    let tasks = [];
    const dateNow = new Date().toUTCString();
    for (let item of tasksArray) {
        const taskDate = item.getElementsByClassName('task-date')[0].value;
        const taskTime = item.getElementsByClassName('task-time')[0].value;
        let taskExpDate = taskDate + ' ' + taskTime;
        taskExpDate = new Date(taskExpDate).toUTCString();
        const task = {
            'id': item.getAttribute('data-id'),
            'description': item.getElementsByClassName('task-desc')[0].value,
            'expDate': taskExpDate,
            'created': dateNow
        };
        tasks.push(task);
    }
    return tasks;
}

export function createTaskObj(taskHTML) {
    const dateNow = new Date().toUTCString();
    const taskDate = taskHTML.getElementsByClassName('task-date')[0].value;
    const taskTime = taskHTML.getElementsByClassName('task-time')[0].value;
    let taskExpDate = taskDate + ' ' + taskTime;
    taskExpDate = new Date(taskExpDate).toUTCString();
    const task = {
        'id': taskHTML.getAttribute('data-id'),
        'description': taskHTML.getElementsByClassName('task-desc')[0].value,
        'expDate': taskExpDate,
        'created': dateNow
    };

    return task;
}

export function updateGoal(goalId) {
    const description = document.getElementById('goal-desc').value;
    let expDate = document.getElementById('goal-date').value + ' ' + document.getElementById('goal-time').value;
    expDate = new Date(expDate).toUTCString();
    const id = goalId;
    const goal = getGoal(goalId);
    const dateNow = goal.created;
    const tasks = goal.tasks;
    const newGoal = { 'id': id, 'description': description, 'expDate': expDate, 'created': dateNow, 'tasks': tasks };
    saveGoal("goal" + goalId, JSON.stringify(newGoal));
}

export function updateTask(goalId, taskId) {
    const goal = getGoal(goalId);
    const task = goal.tasks.find(t => t.id == taskId);
    const taskIndex = goal.tasks.findIndex(t => t == task);
    const taskDate = document.getElementsByClassName('task-date')[0].value;
    const taskTime = document.getElementsByClassName('task-time')[0].value;
    let taskExpDate = taskDate + ' ' + taskTime;
    taskExpDate = new Date(taskExpDate).toUTCString();
    const newTask = {
        'id': taskId,
        'description': document.getElementsByClassName('task-desc')[0].value,
        'expDate': taskExpDate,
        'created': task.created
    };
    goal.tasks[taskIndex] = newTask;
    saveGoal("goal" + goal.id.toString(), JSON.stringify(goal));
}

export function deleteTask(goalId, taskId) {
    const goal = getGoal(goalId);
    if (goal.tasks.length > 1) {
        const index = goal.tasks.findIndex(i => i.id == taskId);
        goal.tasks.splice(index, 1);
        saveGoal("goal" + goalId, JSON.stringify(goal));
    }    
}

export function addTask(goalId, task) {
    const goal = getGoal(goalId);
    goal.tasks.push(task);
    saveGoal("goal" + goalId, JSON.stringify(goal));
}
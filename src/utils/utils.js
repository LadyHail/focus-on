import { findFreeId, getGoal, saveGoal } from './DbHelper.js';

export function createGoalObj(goalId = null) {
    const description = document.getElementById('goal-desc').value;
    let expDate = document.getElementById('goal-date').value + ' ' + document.getElementById('goal-time').value;
    expDate = new Date(expDate).toUTCString();
    const id = goalId !== null ? goalId : findFreeId();
    //TODO keep date if edit
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
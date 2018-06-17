import { findFreeId, getGoal, saveGoal, STATUS } from './dbHelper.js';
import { Goal, Task } from './models.js';

export function createGoalObj() {
    try {
        const description = document.getElementById('goal-desc').value;
        let expDate = document.getElementById('goal-date').value + ' ' + document.getElementById('goal-time').value;
        expDate = new Date(expDate).toUTCString();
        const id = findFreeId();
        const dateNow = new Date().toUTCString();
        const goal = new Goal(id, description, expDate, dateNow, STATUS.waiting);
        return goal;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export function createTasksObjs(tasksArray) {
    let tasks = [];
    const dateNow = new Date().toUTCString();
    for (let item of tasksArray) {
        try {
            const taskDate = item.getElementsByClassName('task-date')[0].value;
            const taskTime = item.getElementsByClassName('task-time')[0].value;
            let taskExpDate = taskDate + ' ' + taskTime;
            taskExpDate = new Date(taskExpDate).toUTCString();
            const task = new Task(
                item.getAttribute('data-id'),
                item.getElementsByClassName('task-desc')[0].value,
                taskExpDate,
                dateNow,
                STATUS.waiting
            );
            tasks.push(task);
            return tasks;
        } catch (e) {
            console.log(e);
        }
    }
    return null;
}

export function createTaskObj(taskHTML) {
    const dateNow = new Date().toUTCString();
    try {
        const taskDate = taskHTML.getElementsByClassName('task-date')[0].value;
        const taskTime = taskHTML.getElementsByClassName('task-time')[0].value;
        let taskExpDate = taskDate + ' ' + taskTime;
        taskExpDate = new Date(taskExpDate).toUTCString();
        const task = new Task(
            taskHTML.getAttribute('data-id'),
            taskHTML.getElementsByClassName('task-desc')[0].value,
            taskExpDate,
            dateNow,
            STATUS.waiting
        );
        return task;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export function updateGoal(goalId) {
    let expDate = null;
    try {
        expDate = document.getElementById('goal-date').value + ' ' + document.getElementById('goal-time').value;
        expDate = new Date(expDate).toUTCString();
    } catch (e) {
        console.log(e);
        return false;
    }
    const id = goalId;
    const goal = getGoal(goalId);
    if (goal !== null) {
        const description = goal.description;
        const status = goal.status;
        const dateNow = goal.created;
        const tasks = goal.tasks;
        const done = goal.done;
        const newGoal = new Goal(id, description, expDate, dateNow, status, tasks, done);
        saveGoal("goal" + goalId, newGoal);
        return true;
    }
    return false;
}

export function updateTask(goalId, taskId) {
    const goal = getGoal(goalId);
    let task = null;
    let taskExpDate = null;
    if (goal !== null) {
        task = goal.tasks.find(t => t.id === taskId);
    } else {
        return false;
    }

    try {
        const taskDate = document.getElementsByClassName('task-date')[0].value;
        const taskTime = document.getElementsByClassName('task-time')[0].value;
        taskExpDate = taskDate + ' ' + taskTime;
        taskExpDate = new Date(taskExpDate).toUTCString();
    } catch (e) {
        console.log(e);
        return false;
    }

    if (task !== null) {
        const taskIndex = goal.tasks.findIndex(t => t === task);
        const status = task.status;
        const done = task.done;
        const newTask = new Task(
            taskId,
            document.getElementsByClassName('task-desc')[0].value,
            taskExpDate,
            task.created,
            status,
            done
        );
        goal.tasks[taskIndex] = newTask;
        saveGoal("goal" + goal.id.toString(), goal);
        return true;
    }
    return false;
}

export function deleteTask(goalId, taskId) {
    const goal = getGoal(goalId);
    if (goal !== null && goal.tasks.length > 1) {
        const index = goal.tasks.findIndex(i => i.id === taskId);
        if (index !== -1) {
            goal.tasks.splice(index, 1);
        }
        saveGoal("goal" + goalId, goal);
        return true;
    }    
    return false;
}

export function addTask(goalId, task) {
    const goal = getGoal(goalId);
    if (goal !== null && task.constructor.name === 'Task') {
        goal.tasks.push(task);
        saveGoal("goal" + goalId, goal);
        return true;
    }
    return false;
}
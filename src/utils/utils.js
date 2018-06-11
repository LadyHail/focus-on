import { findFreeId, getGoal, saveGoal } from './DbHelper.js';
import { Goal, Task } from './models.js';

export const STATUS = {
    done: 'done',
    waiting: 'waiting',
    failed: 'failed'
}

export function isTimedOut(timeLeft) {
    if (timeLeft.time < 0) {
        return true;
    } else {
        return false;
    }
}

export function updateStatus(obj, timeLeft, goalId = null) {
    if (isTimedOut(timeLeft)) {
        const type = obj.constructor.name;
        switch (type) {
            case "Goal":
                obj.status = STATUS.failed;
                saveGoal("goal" + obj.id, JSON.stringify(obj));
                break;
            case "Task":
                obj.status = STATUS.failed;
                const goal = getGoal(goalId);
                const index = goal.tasks.findIndex(t => t.id == obj.id);
                goal.tasks[index] = obj;
                saveGoal("goal" + goalId, JSON.stringify(goal));
                break;
        }        
    }
}

//TODO check data type
export function createGoalObj() {
    const description = document.getElementById('goal-desc').value;
    let expDate = document.getElementById('goal-date').value + ' ' + document.getElementById('goal-time').value;
    expDate = new Date(expDate).toUTCString();
    const id = findFreeId();
    const dateNow = new Date().toUTCString();
    const goal = new Goal(id, description, expDate, dateNow, STATUS.waiting);
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
        const task = new Task(
            item.getAttribute('data-id'),
            item.getElementsByClassName('task-desc')[0].value,
            taskExpDate,
            dateNow,
            STATUS.waiting
        );
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
        'created': dateNow,
        'status': STATUS.waiting
    };

    return task;
}

export function updateGoal(goalId) {
    const description = document.getElementById('goal-desc').value;
    let expDate = document.getElementById('goal-date').value + ' ' + document.getElementById('goal-time').value;
    expDate = new Date(expDate).toUTCString();
    const id = goalId;
    const goal = getGoal(goalId);
    const status = goal.status;
    const dateNow = goal.created;
    const tasks = goal.tasks;
    const newGoal = { 'id': id, 'description': description, 'expDate': expDate, 'created': dateNow, 'tasks': tasks, 'status': status };
    saveGoal("goal" + goalId, JSON.stringify(newGoal));
}

export function updateTask(goalId, taskId) {
    const goal = getGoal(goalId);
    const task = goal.tasks.find(t => t.id == taskId);
    const status = task.status;
    const taskIndex = goal.tasks.findIndex(t => t == task);
    const taskDate = document.getElementsByClassName('task-date')[0].value;
    const taskTime = document.getElementsByClassName('task-time')[0].value;
    let taskExpDate = taskDate + ' ' + taskTime;
    taskExpDate = new Date(taskExpDate).toUTCString();
    const newTask = {
        'id': taskId,
        'description': document.getElementsByClassName('task-desc')[0].value,
        'expDate': taskExpDate,
        'created': task.created,
        'status': status
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
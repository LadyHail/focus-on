import { Goal, Task } from './models.js';
/*eslint no-loop-func: "off"*/

export function getGoal(id) {
    if (!isNaN(id)) {
        let goal = window.localStorage.getItem('goal' + id);
        goal = JSON.parse(goal);
        const goalObj = new Goal(goal.id, goal.description, goal.expDate, goal.created, goal.status, goal.tasks, goal.done);
        return goalObj;
    }
}

export function getAll() {
    const keys = Object.keys(window.localStorage);
    let goals = [];
    let goal = {};
    keys.forEach(function (key) {
        goal = window.localStorage.getItem(key);
        goal = JSON.parse(goal);
        const goalObj = new Goal(goal.id, goal.description, goal.expDate, goal.created, goal.status, goal.tasks, goal.done);
        goals.push(goalObj);
    });
    return goals;
}

export function saveGoal(id, item) {
    window.localStorage.setItem(id, item);
}

export function getTask(goalId, id) {
    if (!isNaN(id)) {
        const goal = getGoal(goalId);
        const task = goal.tasks.find(t => t.id === id);
        const taskObj = new Task(task.id, task.description, task.expDate, task.created, task.status, task.done);
        return taskObj;
    }
}

export function findFreeId() {
    const busyIds = Object.keys(window.localStorage);
    let foundId = false;
    let id = 1;
    while (!foundId) {
        if (!busyIds.find(i => i === 'goal' + id.toString())) {
            foundId = true;
        } else {
            id++;
        }
    }
    return id;
}

export function setTaskId(goalId) {
    const goal = getGoal(goalId);
    const busyIds = goal.tasks.map(t =>t.id);
    let foundId = false;
    let id = 1;
    while (!foundId) {
        if (!busyIds.find(i => i === id.toString())) {
            foundId = true;
        } else {
            id++;
        }
    }
    return id;
}
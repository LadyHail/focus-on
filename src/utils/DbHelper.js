import { Goal, Task } from './models.js';
/*eslint no-loop-func: "off"*/
/*eslint array-callback-return: "off"*/

// Returns Goal object by Id.
export function getGoal(id) {
    if (!isNaN(id)) {
        let goal = window.localStorage.getItem('goal' + id);
        if (goal !== null) {
            goal = JSON.parse(goal);
            const goalObj = new Goal(goal.id, goal.description, goal.expDate, goal.created, goal.status, goal.tasks, goal.done);
            return goalObj;
        }
    }
    return null;
}

// Returns all Goals from localStorage.
export function getAll() {
    const keys = Object.keys(window.localStorage);
    let goals = [];
    let goal = {};
    keys.forEach(function (key) {
        if (key.includes('goal')) {
            goal = window.localStorage.getItem(key);
            if (goal !== null) {
                goal = JSON.parse(goal);
                const goalObj = new Goal(goal.id, goal.description, goal.expDate, goal.created, goal.status, goal.tasks, goal.done);
                goals.push(goalObj);
            }
        }
    });
    return goals;
}

// Saves Goal object to localStorage.
export function saveGoal(id, item) {
    try {
        item = JSON.stringify(item);
        window.localStorage.setItem(id, item);
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
}

// Returns Task object by Id.
export function getTask(goalId, id) {
    if (!isNaN(id) && !isNaN(goalId)) {
        const goal = getGoal(goalId);
        let task = null;
        if (goal !== null) {
            task = goal.tasks.find(t => t.id === id);
        }
        if (task !== null) {
            const taskObj = new Task(task.id, task.description, task.expDate, task.created, task.status, task.done);
            return taskObj;
        }
        return null;
    }
}

// Searches for non-busy Id.
// Returns integer.
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

// Searches for free Id for new Task object.
// Returns integer.
export function setTaskId(goalId) {
    const goal = getGoal(goalId);
    if (goal !== null) {
        const busyIds = goal.tasks.map(t => t.id);
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
    return null;
}

// Constant variable that represents objects status. 
export const STATUS = {
    done: 'done',
    waiting: 'waiting',
    failed: 'failed'
}

// Specifies if object is timed out.
// Returns boolean.
export function isTimedOut(timeLeft) {
    if (timeLeft.time < 0) {
        return true;
    } else {
        return false;
    }
}

// Updates status of object - Goal or Task.
// Returns boolean.
export function updateStatus(obj, timeLeft, goalId = null) {
    const type = obj.type
    if (!timeLeft.hasOwnProperty('time')) {
        return false;
    }
    if (goalId !== null) {
        if (isNaN(goalId)) {
            return false;
        }
    }
    if (isTimedOut(timeLeft) && obj.status === STATUS.waiting) {
        switch (type) {
            case "Goal":
                obj.status = STATUS.failed;
                obj.tasks.forEach(t => {
                    if (t.status === STATUS.waiting) {
                        t.status = STATUS.failed;
                    }
                });
                saveGoal("goal" + obj.id, obj);
                return true;
            case "Task":
                obj.status = STATUS.failed;
                const goal = getGoal(goalId);
                if (goal !== null) {
                    const index = goal.tasks.findIndex(t => t.id === obj.id);
                    goal.tasks[index] = obj;
                    saveGoal("goal" + goalId, goal);
                    return true;
                }
                return false;
            default:
                break;
        }
    } else if (!isTimedOut(timeLeft) && obj.status === STATUS.failed) {
        switch (type) {
            case "Goal":
                obj.status = STATUS.waiting;
                obj.tasks.forEach(t => {
                    if (t.status === STATUS.failed) {
                        t.status = STATUS.waiting;
                    }
                });
                saveGoal("goal" + obj.id, obj);
                return true;
            case "Task":
                const goal = getGoal(goalId);
                if (goal !== null) {
                    if (goal.status !== STATUS.failed) {
                        obj.status = STATUS.waiting;
                        const index = goal.tasks.findIndex(t => t.id === obj.id);
                        goal.tasks[index] = obj;
                        saveGoal("goal" + goalId, goal);
                    }
                    return true;
                }
                return false;
            default:
                break;
        }
    }
}

// Returns integer that represents number of completed Goals.
export function goalsCompleted() {
    const goals = getAll();
    const done = goals.filter(g => {
        if (g.status === STATUS.done) {
            return g;
        }
    });

    return done.length;
}
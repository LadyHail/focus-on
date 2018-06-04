export function getGoal(id) {
    if (!isNaN(id)) {
        let goal = window.localStorage.getItem('goal' + id);
        goal = JSON.parse(goal);
        return goal;
    }
}

export function getAll() {
    const keys = Object.keys(window.localStorage);
    let goals = [];
    let goal = {};
    keys.forEach(function (key) {
        goal = window.localStorage.getItem(key);
        goals.push(JSON.parse(goal));
    });
    return goals;
}

export function saveGoal(id, item) {
    window.localStorage.setItem(id, item);
}
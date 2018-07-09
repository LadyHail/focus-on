// Model for Goal object.
export class Goal {
    constructor(id, description, expDate, created, status, tasks = [], done = null){
        this.id = id;
        this.description = description;
        this.expDate = expDate;
        this.created = created;
        this.tasks = tasks;
        this.status = status;
        this.done = done;
        this.type = "Goal";
    }
}

// Model for Task object.
export class Task {
    constructor(id, description, expDate, created, status, done = null) {
        this.id = id;
        this.description = description;
        this.expDate = expDate;
        this.created = created;
        this.status = status;
        this.done = done;
        this.type = "Task";
    }
}

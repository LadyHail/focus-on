
export class Goal {
    constructor(id, description, expDate, created, status, tasks = []){
        this.id = id;
        this.description = description;
        this.expDate = expDate;
        this.created = created;
        this.tasks = tasks;
        this.status = status;
    }
}


export class Task {
    constructor(id, description, expDate, created, status) {
        this.id = id;
        this.description = description;
        this.expDate = expDate;
        this.created = created;
        this.status = status;
    }
}

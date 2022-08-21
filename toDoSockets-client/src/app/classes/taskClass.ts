export class Task {
    _id?: string
    task: string

    constructor(_id: string, task: string) {
        this._id = _id
        this.task = task
    }
}
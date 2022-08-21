import { Component, Input } from '@angular/core';
import { Task } from 'src/app/classes/taskClass';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() updatedTask: Task = new Task("", "")
  edit = false

  constructor(private socketService: SocketService) { }

  editTask() {
    const taskId = this.socketService.getTaskById(this.updatedTask)

    this.edit = !this.edit;
    const updatedTask: Task = {
      _id: taskId?._id,
      task: this.updatedTask.task
    };
    this.socketService.editTask(updatedTask)

  }

  deleteTask() {
    this.socketService.deleteTask(this.updatedTask)
  }
}

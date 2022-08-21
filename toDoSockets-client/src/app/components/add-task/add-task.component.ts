import { SocketService } from './../../services/socket.service';
import { Component, Input } from '@angular/core';
import { Task } from 'src/app/classes/taskClass';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Input() taskObject: Task = new Task('', "")
  constructor(private socketService: SocketService) { }

  addTask() {
    let task = {
      task: this.taskObject.task,
    }
    this.socketService.addTask(task)
    this.taskObject.task = ''
  }

}

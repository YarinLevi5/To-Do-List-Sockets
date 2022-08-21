import { SocketService } from 'src/app/services/socket.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/classes/taskClass';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task[] = []
  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.tasks = this.socketService.getAllTasks()
  }
}

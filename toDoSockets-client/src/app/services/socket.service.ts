import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Task } from '../classes/taskClass';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: Socket | undefined
  toDoList: Task[] = []

  constructor(private taskService: TaskService) {
  }

  socketConnection(): void {
    this.socket = io('http://localhost:3000');

    this.socket?.on("add", (task: Task) => {
      this.getTaskById(task) ? this.toDoList : this.toDoList.push(task)
    })

    this.socket?.on("edit", (editedTask) => {
      console.log(editedTask);

      this.toDoList.forEach(task => {
        if (task._id === editedTask._id) {
          task.task = editedTask.task
        }
      })
    })

    this.socket?.on("delete", (deletedTask) => {
      this.toDoList.forEach((task, i) => {
        if (task._id == deletedTask._id) this.toDoList.splice(i, 1);
      })
    })
  }


  addTask(task: Task): void {
    this.socket?.emit('addTask', task);
  }

  getAllTasks(): Task[] {
    this.taskService.getAllTasks()
      .subscribe(tasks => {
        this.toDoList = tasks
      },
        err => {
          console.log("The Error : " + err)
        })
    return this.toDoList
  }

  getTaskById(task: Task): Task | undefined {
    return this.toDoList.find(taskExist => taskExist._id === task._id)
  }

  editTask(task: Task): void {
    this.socket?.emit('editTask', task);
  }

  deleteTask(task: Task): void {
    this.socket?.emit('deleteTask', task);
  }

}

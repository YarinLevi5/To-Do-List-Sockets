import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../classes/taskClass';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private configUrl = "http://localhost:3000"

  constructor(private http: HttpClient) { }


  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.configUrl)
      .pipe(
        catchError(err => {
          console.log(err);
          throw new Error(err)
        })
      );
  }

  // getTaskById(task: Task): Observable<Task> {
  //   return this.http.get<Task>(this.configUrl, {...task})
  // }

  // deleteTask(taskObject: Task) : Observable<Task> {
  //   return this.http.delete<Task>(this.configUrl + '/deleteTask/:taskId', task.id )
  // }


}


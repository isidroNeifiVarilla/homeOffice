import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { Task } from '../models/task';
import { Comment } from '../models/comment';
import { Lane } from '../models/lane';
import { AssignTask } from '../models/assignTask';
import { Description } from '../models/description';
 
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private basePath = 'http://localhost:10105/totalplay/msotareas/v1';
  private headers = new HttpHeaders({
    'Content-Type':'application/json',
    'rejectUnauthorized': 'false',
    'requestCert': 'false',
    'Access-Control-Allow-Origin': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',        
    });

  constructor(private http: HttpClient) { }

  getCards(id):Observable<any>{
    const tkn =localStorage.getItem('tokenL');
    const url = `${this.basePath}/cardsID/${id}/${tkn}`;
    return this.http.get(url, {headers: this.headers, observe: 'response'});
  }
  getComments(id):Observable<any>{
    const tkn =localStorage.getItem('tokenL');
    const url = `${this.basePath}/commentTask/${id}/${tkn}`;
    return this.http.get(url, {headers: this.headers, observe: 'response'});
  }
  createTask(task: Task):Observable<any>{
    const tkn =localStorage.getItem('tokenL');
    const url = `${this.basePath}/addTask/${tkn}`;
    return this.http.post(url, task,{headers: this.headers, observe: 'response'});
  }
  addComments(comment: Comment):Observable<any>{
    const tkn =localStorage.getItem('tokenL');
    const url = `${this.basePath}/addCommentTask/${tkn}`;
    return this.http.post(url, comment,{headers: this.headers, observe: 'response'});
  }
  updateLaneTask(lane: Lane):Observable<any>{
    const tkn =localStorage.getItem('tokenL');
    const url = `${this.basePath}/laneTask/${tkn}`;
    return this.http.patch(url, lane,{headers: this.headers, observe: 'response'});
  }
  assignUserTask(assigned: AssignTask):Observable<any>{
    const tkn =localStorage.getItem('tokenL');
    const url = `${this.basePath}/userTask/${tkn}`;
    return this.http.post(url, assigned,{headers: this.headers, observe: 'response'});
  }
  unAssignUserTask(assigned: AssignTask):Observable<any>{
    const tkn =localStorage.getItem('tokenL');
    const url = `${this.basePath}/unassignTask/${tkn}`;
    return this.http.post(url, assigned,{headers: this.headers, observe: 'response'});
  }
  updateDescription(description: Description):Observable<any>{
    const tkn =localStorage.getItem('tokenL');
    const url =`${this.basePath}/editTask/${tkn}`; 
    return this.http.patch(url, description, {headers: this.headers, observe: 'response'})

  }
}

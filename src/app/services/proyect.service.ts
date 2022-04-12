import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Proyect } from '../models/proyect';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {

  private basePath = 'https://msoproject-fy56qox6nq-wl.a.run.app/totalplay/msoproject/v1';
  // 'Access-Control-Allow-Origin: *'
  
  private headers = new HttpHeaders({
    'Content-Type':'application/json',
    'rejectUnauthorized': 'false',
    'requestCert': 'false',
    'Access-Control-Allow-Origin': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',        
    });

  constructor(private http: HttpClient) { }

 getProyects():Observable<any>{
    const tkn= localStorage.getItem('tokenL');
    const url = `${this.basePath}/list/${tkn}`;
    return this.http.get(url, {headers: this.headers, observe: 'response'});
  }
  createProject(project: Proyect):Observable<any>{
    const url = `${this.basePath}/board`;
    return this.http.post(url, project,{headers: this.headers, observe: 'response'});
  }
  getProjectID(id):Observable<any>{
    const tkn= localStorage.getItem('tokenL');
    const url = `${this.basePath}/boardId/${id}/${tkn}`;
    return this.http.get(url, {headers: this.headers, observe: 'response'});
  }
  updateProyect(project: Proyect):Observable<any>{
    const tkn= localStorage.getItem('tokenL');
    const url = `${this.basePath}/Update/${tkn}`;
    return this.http.patch(url, project,{headers: this.headers, observe: 'response'});
  }
  getCards(id):Observable<any>{
    const tkn= localStorage.getItem('tokenL');
    const url = `${this.basePath}/details/${id}/${tkn}`;
    return this.http.get(url, {headers: this.headers, observe: 'response'});
  }

  getcardsBoardId(id):Observable<any>{
    const tkn= localStorage.getItem('tokenL');
    const url = `${this.basePath}/cardsBoardId/${id}/${tkn}`;
    return this.http.get(url, {headers: this.headers, observe: 'response'});
  }
}  

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  from, Observable, of } from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //http://localhost:10107/totalplay/msousuarios/v1
  private basePath = 'https://msousuarios-fy56qox6nq-wl.a.run.app/totalplay/msousuarios/v1';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'});

  constructor(private http: HttpClient) { }

  getUser(id):Observable<User>{
    const tkn =localStorage.getItem('tokenL');
    const url = `${this.basePath}/usuarios/${id}/${tkn}`;
    return this.http.get<User>(url, {headers: this.headers});
  }
  getProjectUser(id):Observable<any>{
    const tkn =localStorage.getItem('tokenL');
    const url = `${this.basePath}/boardUser/${id}/${tkn}`;
    return this.http.get(url,{headers: this.headers, observe: 'response'} );
  }
}

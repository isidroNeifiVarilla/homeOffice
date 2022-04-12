import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  from, Observable, of } from 'rxjs';
import { Login } from '../models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private basePath = 'https://msousuarios-fy56qox6nq-wl.a.run.app/totalplay/msousuarios/v1';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'});

  constructor(private http: HttpClient, private router: Router) { }
  onLogin(form: Login):Observable<any>{
    const url = `${this.basePath}/session`;
    return this.http.post(url,form,{headers: this.headers, observe: 'response'} );
  }
}

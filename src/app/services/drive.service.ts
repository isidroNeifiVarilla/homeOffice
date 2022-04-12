import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Drive } from '../models/drive';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
  })

  export class DriveService {
    
    public access_token = localStorage.getItem("acces_token");
    private basePath = 'https://www.googleapis.com/drive/v3';   
    private headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.access_token},
        );
  
    constructor(private http: HttpClient, private router: Router) { }

    newFile(name: Drive,mime: Drive):Observable<any>{
        const url = `${this.basePath}/files`;
        const body= {name, mime};
        return this.http.post(url, body,{headers: this.headers, observe: 'response'});
      }
      getFileId(id):Observable<any>{
        const url = `${this.basePath}/files/${id}`;
        return this.http.get(url, {headers: this.headers, observe: 'response'});
      }
      getFiles():Observable<any>{
        const url = `${this.basePath}/files`;
        return this.http.get(url, {headers: this.headers, observe: 'response'});
      }
      updateFile(id, name: Drive):Observable<any>{
        const url = `${this.basePath}/files/${id}`;
        const body= {name};
        return this.http.patch(url, body,{headers: this.headers, observe: 'response'});
      }
      deleteFileId(id):Observable<any>{
        const url = `${this.basePath}/files/${id}`;
        return this.http.delete(url, {headers: this.headers, observe: 'response'});
      }

  }
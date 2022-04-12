import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private basePath = 'https://msocards-fy56qox6nq-wl.a.run.app/totalplay/msocards/v1';
  
  private headers = new HttpHeaders({
    'Content-Type':'application/json',
    'rejectUnauthorized': 'false',
    'requestCert': 'false',
    'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',        
    });
  
  constructor(private http: HttpClient) { }

  getCards(id):Observable<any>{
    const tkn= localStorage.getItem('tokenL');
    const url = `${this.basePath}/cardsID/${id}/${tkn}`;
    return this.http.get(url, {headers: this.headers, observe: 'response'});
  }
  getCardsBoard():Observable<any>{
    const tkn= localStorage.getItem('tokenL');
    const url = `${this.basePath}/cardsBoard/${tkn}`;
    return this.http.get(url,{headers: this.headers, observe: 'response'});
  }
  
  getComments(id):Observable<any>{
    const tkn= localStorage.getItem('tokenL');
    const url = `${this.basePath}/commentTask/${id}/${tkn}`;
    return this.http.get(url, {headers: this.headers, observe: 'response'});
  }

  getActivities(fecha):Observable<any>{
    const tkn= localStorage.getItem('tokenL');
    const url = `${this.basePath}/cardActivities/${fecha}/${tkn}`;
    return this.http.get(url, {headers: this.headers, observe: 'response'});
  }

  deleteCards(id):Observable<any>{
    const url = `${this.basePath}/cardsID/${id}`;
    return this.http.delete(url, {headers: this.headers, observe: 'response'});
  }
}

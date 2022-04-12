import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarEvent, Eventos, EventosResponse } from '../models/eventos-response';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
                                              
  public access_token = localStorage.getItem("acces_token");
  private basePath = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.access_token,
  });

  constructor(private http: HttpClient) { }
  getEventos():Observable<any> {
    return this.http.get<EventosResponse>(`${this.basePath}?singleEvents=true`, { headers: this.headers })
      .pipe(map(data => {
        return data.items;
      }));
  }
  AgregarEventos(eventos: Eventos): Observable<any> {
    const url = `${this.basePath}?conferenceDataVersion=1`;
    return this.http.post(url, eventos, { headers: this.headers })
  }
  deleteEvento(id) {
    const url = `${this.basePath}/${id}`;
    return this.http.delete(url, { headers: this.headers });
  }

  updateEvento(id, eventos:Eventos){
    const url = `${this.basePath}/${id}`;
    return this.http.put(url,eventos,{headers: this.headers});
  }
}

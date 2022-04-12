import { Component, OnInit, ChangeDetectionStrategy,ViewChild,TemplateRef,Injectable,ElementRef} from '@angular/core';
import { NgbModal, NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { isSameDay, isSameMonth,} from 'date-fns';
import { CalendarEventTimesChangedEvent,CalendarView} from 'angular-calendar';
import { Subject } from 'rxjs';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es';
import { CalendarService } from 'src/app/services/calendar.service';
import { Attendee, CalendarEvent, Eventos, EventosResponse } from 'src/app/models/eventos-response';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {  NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

export function flatpickrFactory() {
  flatpickr.localize(Spanish);
  return flatpickr;
}
declare const gapi: any;
const I18N_VALUES = {
  'Es': {
    weekdays: ['Lu', 'Ma', 'Mi', 'Jue', 'Vie', 'Sab', 'Do'],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    weekLabel: 'sem'
  }
};

@Injectable()
export class I18n {
  language = 'Es';
}
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  constructor(private _i18n: I18n) { super(); }

  getWeekdayShortName(weekday: number): string { return I18N_VALUES[this._i18n.language].weekdays[weekday - 1]; }
  getWeekLabel(): string { return I18N_VALUES[this._i18n.language].weekLabel; }
  getMonthShortName(month: number): string { return I18N_VALUES[this._i18n.language].months[month - 1]; }
  getMonthFullName(month: number): string { return this.getMonthShortName(month); }
  getDayAriaLabel(date: NgbDateStruct): string { return `${date.day}-${date.month}-${date.year}`; }
}
const enableFormat: any = [{
  from: new Date(0, 1),
  to: new Date(new Date().getFullYear() + 200, 12)
}];
const colors: any = {
  red: {
    primary: '#a9f1c1',
    secondary: '#e1f9e9',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers:
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
})

export class CalendarComponent implements OnInit {
  isSignedIn = false;
  pre = '';
  public correo = localStorage.getItem("correo");
  public calendario = localStorage.getItem("calendario");
  model: NgbDateStruct;
  date: { year: number, month: number };
  eventos: Eventos[] = [];
  summary: string;
  description: string;
  invitado: string;
  public meet: string = "";
  public events: CalendarEvent[] = [];
  public invitados: Attendee[] = [];
  appendPre: any;

  constructor(private calendar: NgbCalendar, private modal: NgbModal,
    private calendarService: CalendarService, private router: Router) {
      
  }

  ngOnInit(): void {
    this.initClient();
    flatpickrFactory();
    this.cargarEventos();
    this.modalData.event;
    this.clearSearchInput();
  }
  initClient() {    
  }

  @ViewChild('modalContent') modalContent: TemplateRef<Eventos>;
  @ViewChild('modalEvent') modalEvent: TemplateRef<Eventos>;
  @ViewChild('modalContentEdit') modalContentEdit: TemplateRef<Eventos>;
  @ViewChild('invitads') invitads: ElementRef;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  viewDateFin: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  modalDataEdit: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = false;
      }
      this.viewDate = date;
    }
    this.summary = "";
    this.description = "";
    this.invitados = [];
    this.invitado = "";
    this.meet = "";
    this.modal.open(this.modalEvent);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      return iEvent;
    });
  }
  public limpiar;
  handleEvent(action: string, event: CalendarEvent): void {
    this.summary = "";
    this.description = "";
    this.invitados = [];
    this.invitado = "";
    this.meet = "";
    this.modalDataEdit = { event, action };
    this.modal.open(this.modalContent);
    this.limpiar = this.modalData.event.invitados.filter((e) => {
      this.invitados.push({
        email: e
      });
      return e != null;
    });
  }
  handleEvent2(action: string, event: CalendarEvent): void {
    this.summary = "";
    this.description = "";
    this.invitados = [];
    this.invitado = "";
    this.meet = "";
    this.modalData = { event, action };
    this.modal.open(this.modalContentEdit);

    this.limpiar = this.modalData.event.invitados.filter((e) => {
      this.invitados.push({
        email: e
      });
      return e != null;
    });
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  onDateSelect(date: NgbDate) {
    let mes = "";
    let day = "" + date.day;
    let year = "" + date.year;
    switch (date.month) {
      case 1:
        mes = "Jan";
        break;
      case 2:
        mes = "Feb";
        break;
      case 3:
        mes = "Mar";
        break;
      case 4:
        mes = "Apr";
        break;
      case 5:
        mes = "May";
        break;
      case 6:
        mes = "Jun";
        break;
      case 7:
        mes = "Jul";
        break;
      case 8:
        mes = "Aug";
        break;
      case 9:
        mes = "Sept";
        break;
      case 10:
        mes = "Oct";
        break;
      case 11:
        mes = "Nov";
        break;
      case 12:
        mes = "Dec";
        break;
    }
    const event1 = new Date(mes + ' ' + day + ', ' + year);
    const event2 = new Date();
    event2.setTime(event1.getTime());
    this.viewDate = event2;
  }
  cargarEventos() {
    this.calendarService.getEventos().subscribe(resp => {
      this.eventos = resp;
      this.mostrarEventos(this.eventos);
    });
  }
  deleteEvento() {
    Swal.fire({
      text:'¿Estás seguro que deseas eliminar evento?',
      icon:'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Confirmar'
    }).then(result =>{
      if(result.value){
        this.calendarService.deleteEvento(this.modalData.event.id).subscribe();
        window.location.reload();
        error=>{
        }
      Swal.fire('', 'Evento agregado correctamente','success');
      window.location.reload();
    }
  }) 

  }
  updateEvent() {
    Swal.fire({
      text:'¿Estás seguro que deseas actualizar evento?',
      icon:'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Confirmar'
    }).then(result =>{
      if(result.value){
      this.calendarService.updateEvento(this.modalData.event.id,
        {
          calendarId: 'primary',
          eventId: this.modalData.event.id,
          start: {
            dateTime: this.modalData.event.start
          },
          end: {
            dateTime: this.modalData.event.end
          },
          summary: this.modalData.event.title,
          description: this.modalData.event.cssClass,
          conferenceData: {
            createRequest: {
              requestId: this.meet,
            }
          },
          sendNotifications: true,
          conferenceDataVersion: 1,
        }
        ).subscribe();         
        error=>{
        }
      Swal.fire('', 'Evento actualizado correctamente','success');
      window.location.reload();
  }
    }) 
  }
  insertEvent(){
    Swal.fire({
      text:'¿Estás seguro que deseas agregar evento?',
      icon:'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Confirmar'
    }).then(result =>{
      if(result.value){
        this.calendarService.AgregarEventos({
        calendarId: 'primary',
          start: {
            dateTime: this.viewDate,
          },
          end: {
            dateTime: this.viewDateFin,
          },
          attendees: this.invitados,
          summary: this.summary,
          description: this.description,
          conferenceData: {
            createRequest: {
              requestId: this.meet,
            }
          },
          sendNotifications: true,
          conferenceDataVersion: 1,

        }).subscribe( resp => this.eventos.push(resp));      
        error=>{
        }
      Swal.fire('', 'Evento agregado correctamente','success');
      window.location.reload();
    }
  }) 
}
  mostrarEventos(evento: Eventos[]) {
    try {
      evento.forEach(element => {
        let inv: string[] = [];
        if (element.attendees) {
          element.attendees.forEach(element2 => {
            inv.push(
              element2.email);
          });
        }
        this.events.push({
          showDeleted: false,
          singleEvents: false,
          calendarId:'primary',
          id: element.id,
          start: new Date(element.start.dateTime || element.start.date),
          end: new Date(element.end.dateTime  || element.start.date),
          meet: element.hangoutLink,
          invitados: inv,
          title: element.summary,
          cssClass: element.description,
          color: colors.blue,
          allDay: true
        });
      });
     // console.log(JSON.stringify(this.events));
    } catch (error) {
    }
  }

  activarMeet() {
    this.meet = "7qxalsvy0e";
    return this.meet;
  }
  agregarInvitado(invitado: string) {
    this.invitados.push({
      email: invitado 
    });
    this.invitado = "";
  }
  clearSearchInput(){
    this.invitads.nativeElement.value = '';
 }
  setView(view: CalendarView) {
    this.view = view;
  }
  closeModal(): void {
    window.location.reload();
  }
  goToMeet(url: string) {
    window.open(url, "_blank");
  }
  quitarInvitado(i: number) {
    this.invitados.splice(i, 1);
  }
  agregarEvento() {
    this.modal.open(this.modalEvent);
  }
}



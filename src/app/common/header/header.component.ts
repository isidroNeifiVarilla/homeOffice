import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'
import { ProyectService } from '../../services/proyect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DatePipe]
})

export class HeaderComponent implements OnInit {

  myDate = new Date();
  day = "";
  mon = "";
  year = "";
  boards: Boards[];

  @Input()
  name: string;
  public avatarG = "";
  public name1 ="";
  constructor(private datePipe: DatePipe, private projectService : ProyectService, private router: Router) { 
    this.day = this.datePipe.transform(this.myDate, 'dd');
    this.mes();
    this.year = this.datePipe.transform(this.myDate, 'yyyy');
  }
  
  search = new FormControl('');
  searchBusqueda = "";
  mes(){
    switch(this.datePipe.transform(this.myDate, 'MM')){
      case '01':
        this.mon = 'Enero';
        break;
      case '02':
        this.mon = 'Febrero';
        break;
      case '03':
          this.mon = 'Marzo';
          break;
      case '04':
        this.mon = 'Abril';
        break;
      case '05':
        this.mon = 'Mayo';
        break;
      case '06':
          this.mon = 'Junio';
          break;
      case '07':
        this.mon = 'Julio';
        break;
      case '08':
        this.mon = 'Agosto';
        break;
      case '09':
          this.mon = 'Septiembre';
          break;
      case '10':
        this.mon = 'Octubre';
        break;
      case '11':
        this.mon = 'Nobiembre';
        break;
      case '12':
          this.mon = 'Diciembre';
          break;
    }
  }

  ngOnInit(): void {
    this.avatarG = localStorage.getItem("avatarG")
    this.name1 = localStorage.getItem("name1")
    this.getProyectos();
    this.search.valueChanges
    .pipe(
       debounceTime(300)
    )
    .subscribe(value => this.searchBusqueda = value)

  }

  getProyectos(){
    this.projectService.getProyects().subscribe(
      (response: any) =>{
        for(let i in response.body){
          this.boards = response.body.boards;
        }
      },
      err => {
        
      }
    );
  }
  logout(){
    localStorage.removeItem("token");
	localStorage.removeItem("tokenL");
    localStorage.removeItem("acces_token");
    this.router.navigate(['']);
  }
}
interface Boards {
  id: String;
  title: String;
}

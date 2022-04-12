import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectService } from '../../services/proyect.service';
import { UserService } from 'src/app/services/user.service';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card';
import { DatePipe } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-vista-general',
  templateUrl: './vista-general.component.html',
  styleUrls: []
})

export class VistaGeneralComponent implements OnInit {
  jstoday;
  boards: Boards[];
  card: Card [];
  public totalRecords = "";
  constructor(private datePipe: DatePipe,private cardService: CardService, private userService : UserService,private projectService : ProyectService, private router: Router) { 
    let date = new Date();
    this.jstoday=this.datePipe.transform(date,"yyyy-MM-dd" +'T'+'00:00:00');
  }
  arraytask;
  taskprocess;
  tasks = [];
  arraytaskProcess;
  ngOnInit(): void {
    this.getProjectU(localStorage.getItem('token'));
    this.checkLocalToken();
    this.getProjectU('');
    this.getactividades();
    this.getcardproces();
    
    this.projectService.getProyects().subscribe(
      (response: any) =>{
        this.totalRecords = response.body.pageMeta.totalRecords;
        for(let i in response.body){
          this.boards = response.body.boards;
        }
      }
    );
  }
   checkLocalToken(){
     if(localStorage.getItem("tokenL")){
       this.router.navigate(['vista-general']);
     }else{
       this.router.navigate([''])
     }
   }
   getcardproces(){
    this.cardService.getCardsBoard().subscribe(
      (response: any) =>{
        this.arraytaskProcess = response.body.body.pageMeta.totalRecords;
      },
    );
   }
   getProjectU(id){
    this.userService.getProjectUser(id).subscribe(
      (response: any) =>{
        this.arraytask = response.body.boards.length;
      },
    );
  }

  getactividades(){
    this.cardService.getActivities(this.jstoday).subscribe(
      (response: any) =>{
        for (let i=0; i< response.body.body.cards.length; i++){ 
          this.tasks.push(response.body.body.cards[i]);
        }
      }
    );
  }
  }
interface Boards{
  id: String;
  title: String;
}
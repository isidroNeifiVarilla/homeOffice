import { Component, Input, OnInit } from '@angular/core';
import { ProyectService } from '../../services/proyect.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.scss'],
})
export class NavComponent implements OnInit {
  
  @Input() isSelectColaboradores: Boolean = false;
  @Input() isSelectGeneral: Boolean = false;
  @Input() isSelectProyectos: Boolean = false;
  @Input() isSelectTareas: Boolean = false;
  @Input() isSelectAreas: Boolean = false;
  @Input() isSelectCarga: Boolean = false;
  boards: Boards[];
  public totalRecords = "";
  proyects = [];
  active =1;
  
  constructor(private userService : UserService,private projectService : ProyectService, private router: Router) {
   }
  arraytask;
  public correo = "";
  ngOnInit(): void {
    this.correo = localStorage.getItem("correo");
    this.getProjectUser(localStorage.getItem('token'));
    this.getProjectUser('');
    this.getpro();
  }
  getpro(){
  this.projectService.getProyects().subscribe(
    (response: any) =>{
      this.totalRecords = response.body.pageMeta.totalRecords;
      for(let i in response.body){
        this.boards = response.body.boards;     
      }
    },
  );
  }
  getProjectUser(id){
    this.userService.getProjectUser(id).subscribe(
      (response: any) =>{
        this.arraytask = response.body.boards.length;
      },
    );
  }
}
interface Boards{
  id: String;
  title: String;
}


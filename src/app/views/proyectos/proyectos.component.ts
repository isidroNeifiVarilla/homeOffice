import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectService } from '../../services/proyect.service';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: []
})
export class ProyectosComponent implements OnInit {
  id = '';
  exampleString: string;
  public boards = [];
  public dataUsers = [];
  constructor(private route: ActivatedRoute, private routes: Router, private projectService : ProyectService) 
  {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  
  ngOnInit(): void {
    this.checkLocalToken();
    this.getProyectos();
  }
  getProyectos(){
    this.projectService.getProyects().subscribe(
      (response: any) =>{
        this.getSM(response.body.boards)
      },
    );
  }
  goToDetallles(id: String){
    this.routes.navigate(['/proyecto-detalle', id])
  }
  getSM(dataBoards: any){
    let index=0;
    for(let i in dataBoards){
      this.projectService.getProjectID(dataBoards[i].id).subscribe(
        (response: any) =>{

          this.dataUsers = response.body.users;
          index = this.dataUsers.findIndex(x => x.roleTypeId === 5);
          if(index == -1){
            index = this.dataUsers.findIndex(x => x.roleTypeId === 2);
          }
          if(index != -1){
            this.boards.push({
              id: dataBoards[i].id+"",
              title: dataBoards[i].title,
              scrumMaster: this.dataUsers[index].fullName,
              avatar: "https://totalplay.leankit.com/avatar/show/"+this.dataUsers[index].id +"/?s=25"
            });
          }  
        },
      );    
    }
  }
  checkLocalToken(){
    if(localStorage.getItem("tokenL")){
      this.routes.navigate(['proyectos']);
    }else{
      this.routes.navigate([''])
    }
  }
}
interface Boards{
  id: String;
  title: String;
  scrumMaster: string;
  avatar: string;
}

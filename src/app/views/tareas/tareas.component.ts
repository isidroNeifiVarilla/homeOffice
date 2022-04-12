import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tareas',
  templateUrl: './tareas.component.html'
})
export class TareasComponent implements OnInit {
  active = 1;
  proyects = [];
  constructor(private userService : UserService, private routes: Router) { }

  ngOnInit(): void {
    this.checkLocalToken();
    this.getProjectUser(localStorage.getItem('token'));
    
  }
  getProjectUser(id){
    this.userService.getProjectUser(id).subscribe(
      (response: any) =>{
        for(var pr of response.body.boards){
          var indexT = this.proyects.findIndex(x => x.id === pr.idboard);
          if(indexT == -1){
            this.proyects.push({
              id: pr.idboard,
              title: pr.boardId
           });
          }  
        }
      },
    );
  }
  goToDetallles(id: String){
    this.routes.navigate(['/proyecto-detalle', id])
  }
  checkLocalToken(){
    if(localStorage.getItem("tokenL")){
      this.routes.navigate(['tareas']);
    }else{
      this.routes.navigate([''])
    }
  }
}

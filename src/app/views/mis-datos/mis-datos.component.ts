import { Component,  Input,  OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: []
})
export class MisDatosComponent implements OnInit {
boards: Boards[]; 
@Input()
  name: string;
  public avatarG = "";
  public name1 = "";
  public correo = "";
  usuario: User | undefined;
  constructor(private userService : UserService, private router: Router) {}

  ngOnInit(): void {
    this.avatarG = localStorage.getItem("avatarG")
    this.name1 = localStorage.getItem("name1");
    this.correo = localStorage.getItem("correo");
    
    this.checkLocalToken();
    this.userService.getUser(1).subscribe(
      usuario =>{
        this.usuario =  JSON.parse(JSON.stringify(usuario)); ;
      },
      err => {
        
      }
    );
  }

  checkLocalToken(){
    if(localStorage.getItem("tokenL")){
      this.router.navigate(['mis-datos']);
    }else{
      this.router.navigate([''])
    }
  }

}
interface Boards {
  id: String;
  title: String;
}

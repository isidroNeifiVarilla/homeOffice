import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organigrama',
  templateUrl: './organigrama.component.html',
  styleUrls: []
})
export class OrganigramaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkLocalToken();
  }
  checkLocalToken(){
    if(localStorage.getItem("tokenL")){
      this.router.navigate(['organigrama']);
    }else{
      this.router.navigate([''])
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: []
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkLocalToken();
  }
  checkLocalToken(){
    if(localStorage.getItem("tokenL")){
      this.router.navigate(['not-found']);
    }else{
      this.router.navigate([''])
    }
  }
}

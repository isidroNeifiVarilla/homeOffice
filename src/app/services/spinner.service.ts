import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinnerService: NgxSpinnerService) { }
  public llamarSpinner(){
    this.spinnerService.show();
  }
  public detenerSpinner(){
    this.spinnerService.hide();
  }
}

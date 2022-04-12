import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-informacion',
  templateUrl: './modal-informacion.component.html'
})
export class ModalInformacionComponent implements OnInit {

  constructor(public modal: NgbModal) { }

  ngOnInit(): void {
  }
  openLG(contenido){
    this.modal.open(contenido, {size: 'xs'})
 }
}

import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-estatus-proyecto',
  templateUrl: './modal-estatus-proyecto.component.html',
  styleUrls: []
})
export class ModalEstatusProyectoComponent implements OnInit {

  constructor(public modal: NgbModal) { }

  ngOnInit(): void {
  }
  
  openLG(contenido){
    this.modal.open(contenido, {size: 'lg'})
 }
}

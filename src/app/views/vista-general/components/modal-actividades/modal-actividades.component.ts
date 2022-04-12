import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-actividades',
  templateUrl: './modal-actividades.component.html',
  styleUrls: []
})
export class ModalActividadesComponent implements OnInit {

  constructor(public modal: NgbModal) { }

  ngOnInit(): void {
  }
  openLG(contenido){
    this.modal.open(contenido, {size: 'lg'})
  }
}
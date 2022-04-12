import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalDriveComponent} from './components/modal-drive/modal-drive.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
  AUTO_STYLE,
} from '@angular/animations';
import { Identifiers } from '@angular/compiler';
const DEFAULT_DURATION = 400;

@Component({
  selector: 'app-proyecto-detalle',
  templateUrl: './proyecto-detalle.component.html',
  animations: [
    trigger('expandCollapse', [
                    state('open', style({height: '100%', opacity: 1})),
                    state('closed', style({height: 0, opacity: 0})),
                    transition('closed => open', animate(DEFAULT_DURATION + 'ms ease-in')),
                    transition('open => closed', animate(DEFAULT_DURATION + 'ms ease-out'))
                ]),
    ]
})
export class ProyectoDetalleComponent implements OnInit {
  id='';
  public isCollapsed = false;
  public isSelect =  false;
  public isSelectAdjuntos = false;
  public isAddAdjunto = false;
  public titleProject: string;
  public scrumMaster: string;
  cards: Cards[] = [
    {
      id: "ID99901",
      title:"Card 01",
    },
    {
      id: "ID99903",
      title:"Card 02",
    },
    {
      id: "ID99903",
      title:"Card 03",
    }
  ];
  constructor(private route: ActivatedRoute, private routes: Router,  public modalService: NgbModal) { }
  ngOnInit(): void {
    this.id =  this.route.snapshot.paramMap.get('id');
  }
  openModal2() {
    const modalRef = this.modalService.open(ModalDriveComponent, { size: 'xl', scrollable: true });
    modalRef.componentInstance.id = 10;
    modalRef.result.then((result) => {
    }).catch((error) => {
    });
  }
  selectAdjuntos(){
    this.isSelectAdjuntos = !this.isSelectAdjuntos;
  }
  addAdjuntos(){
    this.isAddAdjunto = !this.isAddAdjunto;
 }
  updateDataProyect(data: any){
    this.titleProject = data.title;
  }
  getSM(sm){
    this.scrumMaster = sm;

  }
  checkLocalToken(){
    if(localStorage.getItem("token")){
      this.routes.navigate(['proyecto-detalle']);
    }else{
      this.routes.navigate([''])
    }
  }
}

interface Cards{
  id: String;
  title: String;
}
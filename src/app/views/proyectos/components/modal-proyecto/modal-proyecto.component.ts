import { Component, OnInit} from '@angular/core';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Proyect } from '../../../../models/proyect';
import { ProyectService } from '../../../../services/proyect.service';

@Component({
  selector: 'app-modal-proyecto',
  templateUrl: './modal-proyecto.component.html',
  styleUrls: ['./modal-proyecto.component.scss']
})
export class ModalProyectoComponent implements OnInit {
  modalRef : NgbModalRef;
  proyectForm =  new FormGroup({
    title : new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  
  constructor(public modal: NgbModal, private projectService : ProyectService) { }

  ngOnInit(): void {
  }
  
  openLG(contenido){
     this.modalRef= this.modal.open(contenido, {size: 'lg'})
  }
  onProyect(form: Proyect){
    this.projectService.createProject(form).subscribe(
      (response: any) =>{
        this.modalRef.close();
        if(response.ok){
          this.proyectForm.reset()
        }
      },
      err => {
      }
    );
  }
}


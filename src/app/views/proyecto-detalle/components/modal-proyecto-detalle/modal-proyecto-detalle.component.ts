import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ProyectService } from '../../../../services/proyect.service';
import { Proyect } from '../../../../models/proyect';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-modal-proyecto-detalle',
  templateUrl: './modal-proyecto-detalle.component.html'
})
export class ModalProyectoDetalleComponent implements OnInit {
  modalRef : NgbModalRef;
  @Input() id: String;
  title = "";
  description = "";
  proyectForm =  new FormGroup({
    title : new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
  @Output() private dataProject = new EventEmitter<any>();
  constructor(private spinnerService: SpinnerService,public modal: NgbModal, private projectService : ProyectService) { }

  ngOnInit(): void {
    
    this.projectService.getProjectID(this.id).subscribe(
      (response: any) =>{
        this.title = response.body.title;
        this.description =  response.body.description;
        this.proyectForm.setValue({title: this.title, description: this.description});
        this.dataProject.emit(response.body);
      },
      err => {
        
      }
    );
  }
  openLG(contenido){
    this.modalRef= this.modal.open(contenido, {size: 'lg'})
 
  }
  onProyect(form: Proyect){
    
    form.idboard = this.id+"";
  
    this.projectService.updateProyect(form).subscribe(
      (response: any) =>{
        this.modalRef.close();
        if(response.ok){
          this.dataProject.emit(form);
        }
      },
      err => {
      }
    );
    
  }
}


import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DriveService } from '../../../../services/drive.service';
import { id } from 'date-fns/locale';
import { Drive } from '../../../../models/drive';
import Swal from 'sweetalert2';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-drive',
  templateUrl: './modal-drive.component.html',
  styleUrls: ['./modal-drive.component.scss']
})
export class ModalDriveComponent implements OnInit {
  mensajeInicial: Drive;
  name_file: File;
  item: Drive;
  lis_file: Drive[];
  lis2_file: Drive[];
  file = '';
  id='';
  itemupdate;
  editando =false;
  img_pdf = '../../../assets/img/unidad-compartida/pdf.svg';
  img_doc= '../../../assets/img/unidad-compartida/001-google docs.svg';
  img_excel='../../../assets/img/unidad-compartida/003-google sheets.svg';
  img_gallery='../../../assets/img/unidad-compartida/gallery.svg';
  img_folder='../../../assets/img/unidad-compartida/carpeta-1.svg';
  img_otro='../../../assets/img/unidad-compartida/002-google forms.svg';

  constructor(private DriveService:DriveService,  private router: Router, private activeModal: NgbActiveModal) { }
 filterGet ='';
 ngOnInit(): void {

     this.getFile();
     this.AgregarFile('');
     this.deletefile(''); 
     this.tipodeArchivoDrive('');
 }
 closeModal() {
  this.activeModal.close('Modal Closed');
}


 deletefile(id: string){
   Swal.fire({
     text:'¿Estás seguro que deseas eliminar el archivo?',
     icon:'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor:'#d33',
     confirmButtonText:'Confirmar'
   }).then(result =>{
     if(result.value){
       this.DriveService.deleteFileId(id).subscribe(
         (resp: any)=>{
           const indexItem = this.lis_file.findIndex(item => item.id === id);
           this.lis_file.splice(indexItem, 1);
         },
         error=>{
         }
       );
       Swal.fire('', 'Archivo eliminado correctamente','success');
     }
   }) 
 }
  
 updatefile(){
   this.DriveService.updateFile(this. item.id, this.itemupdate).subscribe(
     (resp: any)=>{
       const index_update= this.lis_file.find( file => file.id === resp.id);
       index_update.name=resp.name;
     },
      error => {
      } 
    ) 
 }

 openModal(items){
  this.item =items;
  this.itemupdate=this.item.name;
}
url(itemurl){
 this.item=itemurl.id;
const url = "https://drive.google.com/file/d/"+this.item;
window.open(url, '_blank');
 
}
 getFile(){
   this.DriveService.getFiles().subscribe(
      resp => {
       this.lis_file = resp.body.files;
     },
   );
 }
 getFileId(){
   this.DriveService.getFileId(id).subscribe(
      resp => {
       this.lis_file = resp.body.files;
     },
   );
 }
 
 AgregarFile(evento){
   const my_file= evento.target.files[0];
   this.DriveService.newFile(my_file.name, my_file.mime).subscribe(
     (resp: any)=>{
       this.tipodeArchivoDrive('');
        this.getFile();
      },
    )
  }
  separartypemime(cadena){
   let typemime = cadena.substring(0, cadena.lastIndexOf("."));
   let ext = cadena.substring(cadena.lastIndexOf(".") + 1);
   return { codigo:typemime, exts:ext};
    }
   separartypemime_diagonal(cadena){
     let typemime = cadena.substring(0, cadena.lastIndexOf("."));
     let ext = cadena.substring(cadena.lastIndexOf("/") + 1);
     return { codigo:typemime, exts:ext};
   }
  tipodeArchivoDrive(item){
   let documento=  this.separartypemime(item);
   let documento2=  this.separartypemime_diagonal(item);
     let pdf = documento2.exts;
     let png = documento2.exts;
     let folder = documento.exts;
     let document = documento.exts;
     let document2 = documento.exts;
     let excel = documento.exts;
     if (pdf == 'pdf'){ 
       return this.img_pdf;
      }
       if (folder == 'folder') {
         return this.img_folder;
       }
       if (excel == 'sheet') { 
         return this.img_excel;
        }
       if (document == 'document') { 
         return this.img_doc;
        }
        if (document2 == 'msword') { 
         return this.img_doc;
        }
        if (png == 'jpeg') { 

          return this.img_gallery;
          
        }
        if (png == 'png') { 

         return this.img_gallery;
         
       }  else{ 
           return this.img_otro;
     } 
  }
 }
 

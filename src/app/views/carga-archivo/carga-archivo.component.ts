import { FirestoreService } from '../../services/firestore.service';
import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ProyectService } from '../../services/proyect.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { FormBuilder } from '@angular/forms';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carga-archivo',
  templateUrl: './carga-archivo.component.html',
  styleUrls: ['./carga-archivo.component.scss']
})
export class CargaArchivoComponent implements OnInit {

  public mostrarDiv = false;
  public mostrarDivVPN = false;
  dataVPN;
  dataHO;
  maxDate = new Date();
  active = 1;
  lis_user = [];
  selectedStatus: string = '';
  img_home = '../../../assets/img/areas-proyectos/home_office.png';
  img_oficina = '../../../assets/img/areas-proyectos/edificio.png';
  myDate = new Date();
  day = "";
  mon = "";
  year = "";
  itemupdate;
  itemupdate_name;
  itemupdate_idempleado;
  itemupdate_status;
  item_fechas1;
  item_fechas2;
  item_fechas3;
  item_fechas4;
  item_fechas5;
  item_fechas6;
  item_fechas7;
  item_fechas8;
  item_fechas9;
  item_fechas10;
  item_fechas11;
  item_fechas12;
  item_fechas13;
  item_fechas14;
  item_fechas15;
  item_fechas16;
  item_fechas17;
  item_fechas18;
  item_fechas19;
  item_fechas20;
  item_fechas21;
  item_fechas22;
  item_fechas23;
  item_fechas24;
  item_fechas25;
  item_fechas26;
  item_fechas27;
  item_fechas28;
  item_fechas29;
  item_fechas30;
  item_fechas31;
  itemupdate_apellidoM;
  itemupdate_apellidoP;
  itemnamec;
  item: User;
  status: any = [
    'Home Offices',
    'Sitio'
  ];
  areas = [

  ];

  coleccionAreasUsuarios = new Set();

  @Input()
  name: string;
  public avatarG = "";
  public name1 = "";
  constructor(private formbuilder: FormBuilder, private firestoreService: FirestoreService, private datePipe: DatePipe, private projectService: ProyectService, private router: Router) {

    this.day = this.datePipe.transform(this.myDate, 'dd');
    this.mes();
    this.year = this.datePipe.transform(this.myDate, 'yyyy');
  }

  filterUser = '';
  mes() {
    switch (this.datePipe.transform(this.myDate, 'MM')) {
      case '01':
        this.mon = 'Enero';
        break;
      case '02':
        this.mon = 'Febrero';
        break;
      case '03':
        this.mon = 'Marzo';
        break;
      case '04':
        this.mon = 'Abril';
        break;
      case '05':
        this.mon = 'Mayo';
        break;
      case '06':
        this.mon = 'Junio';
        break;
      case '07':
        this.mon = 'Julio';
        break;
      case '08':
        this.mon = 'Agosto';
        break;
      case '09':
        this.mon = 'Septiembre';
        break;
      case '10':
        this.mon = 'Octubre';
        break;
      case '11':
        this.mon = 'Nobiembre';
        break;
      case '12':
        this.mon = 'Diciembre';
        break;
    }
  }

  ngOnInit(): void {
    this.avatarG = localStorage.getItem("avatarG")
    this.getUser();
    this.status_user('');
    this.checkLocalToken();
    this.prepUpdateUser('');
  }


  prepUpdateUser(items, popup?: boolean) {
    this.item = items;
    this.itemupdate = popup ? this.item.email['stringValue'] : this.item.email;
    this.itemupdate_name = popup ? this.item.name['stringValue'] : this.item.name;
    this.itemupdate_apellidoM = popup ? this.item.apellidoMaterno['stringValue'] : this.item.apellidoMaterno;;
    this.itemupdate_apellidoP = popup ? this.item.apellidoPaterno['stringValue'] : this.item.apellidoPaterno;;
    this.itemupdate_idempleado = popup ? this.item.idempleado['doubleValue'] : this.item.idempleado;
    this.itemupdate_status = popup ? this.item.status['booleanValue'] : this.item.status;
    this.itemnamec = this.itemupdate_name + ' ' + this.itemupdate_apellidoM + ' ' + this.itemupdate_apellidoP;
    this.item_fechas1 = popup ? this.item.fecha['mapValue'].fields['1'].booleanValue : this.item.fecha;
    this.item_fechas2 = popup ? this.item.fecha['mapValue'].fields['2'].booleanValue : this.item.fecha;
    this.item_fechas3 = popup ? this.item.fecha['mapValue'].fields['3'].booleanValue : this.item.fecha;
    this.item_fechas4 = popup ? this.item.fecha['mapValue'].fields['4'].booleanValue : this.item.fecha;
    this.item_fechas5 = popup ? this.item.fecha['mapValue'].fields['5'].booleanValue : this.item.fecha;
    this.item_fechas6 = popup ? this.item.fecha['mapValue'].fields['6'].booleanValue : this.item.fecha;
    this.item_fechas7 = popup ? this.item.fecha['mapValue'].fields['7'].booleanValue : this.item.fecha;
    this.item_fechas8 = popup ? this.item.fecha['mapValue'].fields['8'].booleanValue : this.item.fecha;
    this.item_fechas9 = popup ? this.item.fecha['mapValue'].fields['9'].booleanValue : this.item.fecha;
    this.item_fechas10 = popup ? this.item.fecha['mapValue'].fields['10'].booleanValue : this.item.fecha;
    this.item_fechas11 = popup ? this.item.fecha['mapValue'].fields['11'].booleanValue : this.item.fecha;
    this.item_fechas12 = popup ? this.item.fecha['mapValue'].fields['12'].booleanValue : this.item.fecha;
    this.item_fechas13 = popup ? this.item.fecha['mapValue'].fields['13'].booleanValue : this.item.fecha;
    this.item_fechas14 = popup ? this.item.fecha['mapValue'].fields['14'].booleanValue : this.item.fecha;
    this.item_fechas15 = popup ? this.item.fecha['mapValue'].fields['15'].booleanValue : this.item.fecha;
    this.item_fechas16 = popup ? this.item.fecha['mapValue'].fields['16'].booleanValue : this.item.fecha;
    this.item_fechas17 = popup ? this.item.fecha['mapValue'].fields['17'].booleanValue : this.item.fecha;
    this.item_fechas18 = popup ? this.item.fecha['mapValue'].fields['18'].booleanValue : this.item.fecha;
    this.item_fechas19 = popup ? this.item.fecha['mapValue'].fields['19'].booleanValue : this.item.fecha;
    this.item_fechas20 = popup ? this.item.fecha['mapValue'].fields['20'].booleanValue : this.item.fecha;
    this.item_fechas21 = popup ? this.item.fecha['mapValue'].fields['21'].booleanValue : this.item.fecha;
    this.item_fechas22 = popup ? this.item.fecha['mapValue'].fields['22'].booleanValue : this.item.fecha;
    this.item_fechas23 = popup ? this.item.fecha['mapValue'].fields['23'].booleanValue : this.item.fecha;
    this.item_fechas24 = popup ? this.item.fecha['mapValue'].fields['24'].booleanValue : this.item.fecha;
    this.item_fechas25 = popup ? this.item.fecha['mapValue'].fields['25'].booleanValue : this.item.fecha;
    this.item_fechas26 = popup ? this.item.fecha['mapValue'].fields['26'].booleanValue : this.item.fecha;
    this.item_fechas27 = popup ? this.item.fecha['mapValue'].fields['27'].booleanValue : this.item.fecha;
    this.item_fechas28 = popup ? this.item.fecha['mapValue'].fields['28'].booleanValue : this.item.fecha;
    this.item_fechas29 = popup ? this.item.fecha['mapValue'].fields['29'].booleanValue : this.item.fecha;
    this.item_fechas30 = popup ? this.item.fecha['mapValue'].fields['30'].booleanValue : this.item.fecha;
    this.item_fechas31 = popup ? this.item.fecha['mapValue'].fields['31'].booleanValue : this.item.fecha;
  }

  getUser() {
    this.firestoreService.getTeam().subscribe(
      resp => {
        for (let i = 0; i < resp.docs.length; i++) {
          this.lis_user.push(resp.docs[i]._delegate._document.data.value.mapValue.fields);
          this.obtenerColeccionAreas(this.lis_user);
        }
      },
    );
  }

  obtenerColeccionAreas(lista_usuarios_back: any[]): void {
    const areas = this.creacionAreas(lista_usuarios_back);
    if (typeof (this.areas) !== 'undefined' && this.areas !== null) {
      lista_usuarios_back.forEach(usr => {
        areas.forEach(area => {
          if (usr.area.stringValue === area.area_Name) {
            area.usuarios.push(usr)
            if (usr.responsable.stringValue !== '') {
              area.responsable_Name = usr.responsable.stringValue;
            }
          }
        });
      });
      this.areas = areas;
    }
  }

  creacionAreas(lista: any[]): any[] {
    const areasSet = new Set;
    lista.forEach(usuario => {
      areasSet.add(usuario.area.stringValue);
    });
    const areasLoc = [];
    areasSet.forEach(area => {
      const element = {
        area_Name: area,
        responsable_Name: '',
        usuarios: []
      }
      areasLoc.push(element);
    });
    return areasLoc;

  }

  radioChangeHandler(event: any) {
    this.selectedStatus = event.target.value;
  }

  status_user(item) {
    let iconos = item;
    if (iconos == true) {
      return this.img_home;
    } else {
      return this.img_oficina;
    }
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenL");
    localStorage.removeItem("acces_token");
    this.router.navigate(['']);
  }

  checkLocalToken() {
    if (localStorage.getItem("tokenL")) {
      this.router.navigate(['carga-archivo']);
    } else {
      this.router.navigate([''])
    }
  }

  convertedJson!: string;
  tableExcel: any[] = [];
  nameFile: string;
  fileUpload(event: any) {
    const selectFile = event.target.files[0];
    this.nameFile = event.target.files[0].name;
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectFile);
    fileReader.onload = (event: any) => {
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach(sheet => {
        //Sheets to Json
        this.dataHO = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log(this.dataHO);
        //Json to String
        this.convertedJson = JSON.stringify(this.dataHO, undefined, 4);
        //Se muestra string[] en tabla front
        this.tableExcel = this.dataHO;
        this.mostrarDiv = true;

        // console.log(this.groupJSON(this.dataHO,'NodeEmpleado',['Nombre']));
      })
    }
  }
  confirmacionJson() {
    var TableHO = document.getElementById("tableHO");
    TableHO.innerHTML = "";
    this.mostrarDiv = false;
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Datos cargados',
      showConfirmButton: false,
      timer: 1500
    });
  }

  convertedJsonVPN!: string;
  tableExcelVPN: any[] = [];
  nameFileVPN: string;
  
  fileUploadVPN(event: any) {
    const selectFile = event.target.files[0];
    this.nameFileVPN = event.target.files[0].name;
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectFile);
    fileReader.onload = (event: any) => {
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach(sheet => {
        //Sheets to Json
        this.dataVPN = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { raw: false, dateNF: 'dd-mm-yyyy' });
        console.log("dataaaa", this.dataVPN);
        //Json to String
        this.convertedJsonVPN = JSON.stringify(this.dataVPN);
        //Se muestra string[] en tabla front
        this.tableExcelVPN = this.dataVPN;
        this.mostrarDivVPN = true;

        // console.log(this.groupJSON(this.dataVPN,'id',['ID']));
      })
    }
  }



  confirmacionJsonVPN() {
    var TableHO = document.getElementById("tableVPN");
    TableHO.innerHTML = "";
    this.mostrarDivVPN = false;
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Datos cargados',
      showConfirmButton: false,
      timer: 1500
    });
  }

}

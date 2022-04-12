import { Component, Input, OnInit, Output, EventEmitter, Renderer2, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { animate, state, style, transition, trigger, AUTO_STYLE } from '@angular/animations';
import { ProyectService } from '../../../../services/proyect.service';
import { CardService } from '../../../../services/card.service';
import { TaskService } from '../../../../services/task.service';
import { Comments } from '../../../../models/comments'
import { Task } from '../../../../models/task';
import { Comment } from '../../../../models/comment';
import { Lane }  from '../../../../models/lane';
import { AssignTask } from '../../../../models/assignTask';
import { Description } from '../../../../models/description';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';
import { UserService } from '../../../../services/user.service';

const DEFAULT_DURATION = 600;
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-collapsed',
  templateUrl: './task-collapsed.component.html',
  styleUrls: ['./task-collapsed.component.scss'],

  animations: [
    trigger('expandCollapse', [
                    state('open', style({height: '100%', opacity: 1})),
                    state('closed', style({height: 0, opacity: 0})),
                    transition('closed => open', animate(DEFAULT_DURATION + 'ms ease-in')),
                    transition('open => closed', animate(DEFAULT_DURATION + 'ms ease-out'))
                ]),
    ]
})
export class TaskCollapsedComponent implements OnInit {
  htmlContent = '<p style="background: blue;backgraund:blue;">Hola</p>';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '8rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'heading',
        'fontName'
      ],
      [
        'textColor',
        'backgroundColor',
        'customClasses',
        'insertImage',
        'insertVideo',
        'removeFormat',
        'toggleEditorMode'
      ]
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  @ViewChild('inputTask') inputTask;
  @ViewChild('inputTaskDescription', { static: false }) inputTaskDescription: ElementRef; 
  miarray:Array<any>;
  public isCollapsed = false;
  public isSelect =  false;
  public isDetalle =  false;
  public dateTask = '';
  public titleTask = '';
  public laneTask = "";
  public descriptionTask = '';
  public idtask = "";
  public typeIdd="";
  public comentario = "";
  public idCardPrincipal = "";
  public dataT = {};
  public dataUsers = [];
  public selectedDelete =[];
  public laneTaskS="";
  public scrumM = "";
  dataComments: Comments[] = [];
  dataSelectUsers: Select[];
  dataLane: Lane;
  dataTask: Task;
  dataAssignedUser: AssignTask;
  carsE: CardID;
  dataComment: Comment;
  dataDescription: Description;
  public avatarG = "";
  public name1= "";
  cards: Cards[] = [
    {
      id: "ID0099812",
      title:"Card 01",
    },
    {
      id: "ID0099813",
      title:"Card 02",
    },
    {
      id: "ID0099814",
      title:"Card 03",
    },
    {
      id: "ID0099815",
      title:"Card 04",
    },
    {
      id: "ID0099816",
      title:"Card 05",
    },
    {
      id: "ID0099817",
      title:"Card 06",
    }
  ];
  @Input() id: String;
  @Input() titleProject: String;
  @Output() private dataScrum = new EventEmitter<string>();

 @Output() openDetalles = new EventEmitter<any>();
  public items = [];
  public selected = [];
  correo: string;
  
  constructor(private userService : UserService,private renderer: Renderer2, private projectService : ProyectService, private cardService: CardService, private taskService: TaskService) { }


  ngOnInit(): void {
    this.avatarG = localStorage.getItem("avatarG")
    this.projectService.getCards(this.id).subscribe(
      (response: any) =>{
        this.miarray = response.body.tarea;
        this.getDataProject();
      },
    );
  }
  getDataProject(){
    this.projectService.getProjectID(this.id).subscribe(
      (response: any) =>{
        this.typeIdd=response.body.defaultTaskTypeId;
        let index=0;
        this.dataUsers = response.body.users;
        index = this.dataUsers.findIndex(x => x.roleTypeId === 5);
          if(index == -1){
            index = this.dataUsers.findIndex(x => x.roleTypeId === 2);
          }
          if(index != -1){
            this.dataScrum.emit(this.dataUsers[index].fullName);
          }
        this.getSelectUser(response.body.users);
      },
    );
  }
  getSelectUser(user: any){
    for (let us of user) {
      this.items.push({
        id: us.id, 
        name: us.fullName, 
        image: "https://totalplay.leankit.com/avatar/show/"+us.id+"/?s=25"
      });
    }
  }
  createTask(nameTask, idCard){
    if(nameTask!==''){
      this.dataTask = {
        typeId:this.typeIdd,
        id: idCard,
        title: nameTask,
      };
      this.taskService.createTask(this.dataTask).subscribe(
        (response: any) =>{
          this.idtask =  response.body.info.id;
          this.inputTask.nativeElement.value = '';
          const y: number = +idCard;
          let index = this.miarray.findIndex(x => x.id === y)
          this.miarray[index].task.cards.push({
            assignedUsers: [],
            done: false,
            id: parseInt(response.body.info.id),
            laneId: parseInt(response.body.info.lane.id),
            lanes: null,
            parentCards: [],
            plannedFinish: null,
            priority: response.body.info.priority,
            task: null,
            title: nameTask,
            typeId:this.typeIdd
            
          });
          
        },
      );
    }    
  }
  addComment(commentTask){
    if(this.comentario!=""){
      this.dataComment = {
        id: this.idtask,
        text: this.comentario
     };
     this.taskService.addComments(this.dataComment).subscribe(
       (response: any) =>{
         this.getComments(this.idtask);
         this.comentario = "";
       },
       err => {   
       }
     );
    }
  }
  selectTask(id: string, dateTask: string, idCardPrincipal: string, laneT: string){
    this.laneTaskS = laneT;
    this.idCardPrincipal = idCardPrincipal;
    this.idtask = id;
    this.dataComments = []
    this.isDetalleControl();
    this.dateTask =  dateTask;
    this.getDetalle(id);
  }
  isDetalleControl(){
    this.isDetalle = !this.isDetalle;
  }
  getDetalle(id: string){
    this.cardService.getCards(id).subscribe(
      (response: any) =>{
        this.titleTask = response.body.body.title;
        this.descriptionTask =  response.body.body.description;
        this.laneTask = response.body.body.lane.id;
        this.getComments(id);
        this.insertSelect(response.body.body.assignedUsers)

      },
    );
  }
  insertSelect(users: any){
    const u = "";
    this.selected = [];
    let i=0;
     for (let user of users) {
       this.selected[i]=user.id; 
      i++;
     }
     this.selectedDelete =  this.selected;
  }
  getComments(id: string){
    this.dataComments = [];
    this.taskService.getComments(id).subscribe(
      (response: any) =>{
        for (let comm of response.body.body.comments) {
             this.dataComments.push({
              id:"",
              user: comm.createdBy.fullName,
              fecha: comm.createdOn,
              description: comm.text,
              avatar: "https://totalplay.leankit.com"+comm.createdBy.avatar
             });
        }
      },
      err => {
        
      }
    );
  }
  editTaskLaneButton(){
    this.editTaskLane(this.idtask,this.laneTaskS);
  }
  editTaskLane(id,ln){

    this.cardService.getCards(id).subscribe(
      (response: any) =>{
        this.laneTask = response.body.body.lane.id;
        this.updateLane(id,ln);
      },
      err => {
        
      }
    );
 
  }
  updateLane(id, ln){
   const dat = {};
			 if(parseInt(ln) == parseInt(this.laneTask)){
            this.dataLane = {
                id: id,
					      value: parseInt(ln)-2
             };
			    
			 }else{
        this.dataLane = {id: id,
					    value: parseInt(ln)
            };
			 }
       this.taskService.updateLaneTask(this.dataLane).subscribe(
        (response: any) =>{
          const y: number = +this.idCardPrincipal;
          const index = this.miarray.findIndex(x => x.id === y);
          const yT: number = +this.idtask;
          const indexT = this.miarray[index].task.cards.findIndex(x => x.id === yT);
          this.miarray[index].task.cards[indexT].laneId = this.dataLane.value;
        },
        err => {
        
        }
      );
  }
  editDetallesTask(){
    this.updateDescription();
    this.isDetalleControl();
    if(this.selectedDelete != this.selected){
      if(this.selectedDelete.toString() == ""){
        this.assignedUsers();
      }else{
       this.unAssignedUsers();
      }   
    }
  }
  assignedUsers(){
    let u = "";
    for (let us of this.selected) {
        u = u + us + ",";
    }
    u = u.substring(0, u.length-1);
    this.dataAssignedUser = {
      cardIds: this.idtask,
      userIdsToAssign: u,
      userIdsToUnassign: ""
    };
    if(this.selected.toString()!=""){
    }
    this.taskService.assignUserTask(this.dataAssignedUser).subscribe(
      (response: any) =>{
        let y: number = +this.idCardPrincipal;
        let index = this.miarray.findIndex(x => x.id === y);
        let yT: number = +this.idtask;
        let indexT = this.miarray[index].task.cards.findIndex(x => x.id === yT);
        for(let us of this.selected){
          const indexU = this.dataUsers.findIndex(x => x.id === us);
          this.miarray[index].task.cards[indexT].assignedUsers.push({
            avatar: "https://totalplay.leankit.com/avatar/show/"+us+"/?s=25",
            emailAddress: this.dataUsers[indexU].emailAddress,
            fullName: this.dataUsers[indexU].fullName,
            id: parseInt(us),
          });
        }
      },
      err => {
        
      }
    );
  }
  unAssignedUsers(){
    let u = "";
    for (let us of this.selected) {
        u = u + us + ",";
    }
    u = u.substring(0, u.length-1);
    this.dataAssignedUser = {
      cardIds: this.idtask,
      userIdsToAssign: "",
      userIdsToUnassign: this.selectedDelete+""
    };
    //texto.value = texto.value.substring(0, texto.value.length - 1);
    this.taskService.unAssignUserTask(this.dataAssignedUser).subscribe(
      (response: any) =>{
        const y: number = +this.idCardPrincipal;
        const index = this.miarray.findIndex(x => x.id === y);
        const  yT: number = +this.idtask;
        const indexT = this.miarray[index].task.cards.findIndex(x => x.id === yT);
        this.miarray[index].task.cards[indexT].assignedUsers.splice(0);
        this.assignedUsers();
      },
      err => {
        
      }
    );
  }
  updateDescription(){
    this.dataDescription = {
      id: this.idtask,
      value: this.descriptionTask
    };
    this.taskService.updateDescription(this.dataDescription).subscribe(
      (response: any) =>{
      },
      err => {
        
      }
    );
  }
  deletetask(){
    Swal.fire({
      text:'¿Estas seguro que deseas eliminar la tarea?',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Tarea eliminada!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
 }
}
interface Cards{
  id: String;
  title: String;
}
interface CardID{
  id: string
}
interface Select{
  id: string,
  name: string,
  image: string
}

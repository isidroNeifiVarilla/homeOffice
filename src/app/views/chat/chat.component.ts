
import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../../services/chat.service'
import { ScrollToBottomDirective } from '../../scroll.-to-bottom.directive';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  @ViewChild('scrollMe') chat: ElementRef;  
  scrolltop: number = null;
  @ViewChild(ScrollToBottomDirective)
  mensaje: string ="";
  scroll: ScrollToBottomDirective;
  elemento: any;
  public name1 = "";
  public correo = "";
  public avatarG = "";
  
  constructor(public _cs: ChatService) { 
    this._cs.cargarMensaje().subscribe(()=>{
      setTimeout( ()=>{
        this.scroll;
    },5000);
  });
}

  ngOnInit(){
    this.elemento = document.getElementById('app-mensajes');
    this.name1 = localStorage.getItem("name1")
    this.correo = localStorage.getItem("correo")
    this.avatarG = localStorage.getItem("avatarG")
    this.scroll;
  }
  cerrar_ventana(){
    window.close();
  }
  enviar_mensaje(){
    if( this.mensaje.length === 0){
      return;
    }
  this._cs.agregarMensaje(this.mensaje)
      .then(()=>this.mensaje = "")
      .catch((err)=>console.error('error al enviar', err));
  }
}

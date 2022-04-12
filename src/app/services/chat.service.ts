import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../models/mensaje.interface';
import { map } from 'rxjs/operators';


@Injectable()

export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje [] = [];
  public correo1 = localStorage.getItem("correo")

  constructor(private afs: AngularFirestore) { }

  cargarMensaje(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('date', 'desc').limit(50));
    return this.itemsCollection.valueChanges().
              pipe(map((message: Mensaje[]) =>{
                this.chats = [];
                  for (let mensaje of message){
                      this.chats.unshift(mensaje);
                      }
                        return this.chats;
                   }));
              }
    agregarMensaje (texto: string){
       let mensaje: Mensaje = {
          nickname:localStorage.getItem("name1"),
          message: texto,
          date: new Date().getTime(),
          correo: this.correo1,
          roomname: localStorage.getItem("avatarG")
         // date: new Date().getTime()
       }
       return this.itemsCollection.add(mensaje);
    }
}





import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  agregarToken(addtoken: any): Promise<any> {
    return this.firestore.collection('leankit').add(addtoken);
  }
  getToken(correo: string): Observable<any> {
    return this.firestore.collection('leankit', ref => ref.where('correo', 
    '==', correo))
      .snapshotChanges()
      .pipe(map(users => {
        const user = users[0];
        if (user) {
          const data = user.payload.doc.data() as User;
          const id = user.payload.doc.id;
          return { id, ...data };
        }
          else {
            return null;
          }
      }));
}
  getTeam(): Observable<any> {
  return this.firestore.collectionGroup('team1').get();     
}
  getTeam1(): Observable<any> {
    return this.firestore.collectionGroup('team').get();     
  }
}
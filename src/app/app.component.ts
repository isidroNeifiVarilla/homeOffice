import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
const config ={
  apiKey: 'AIzaSyC4Fgm6-jryvQ0UD8yKdQGFcJZccZPvjNA',
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d3j09%40test-f8b48.iam.gserviceaccount.com"
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public items: Observable <any[]>;
  title = 'homeoffice';
    constructor(db: AngularFirestore) {
      this.items = db.collection('chats').valueChanges();
     }
    ngOnInit() {
    }
}

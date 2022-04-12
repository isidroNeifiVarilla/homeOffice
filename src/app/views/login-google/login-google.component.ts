import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare const gapi: any;

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.scss']
})
export class LoginGoogleComponent implements OnInit {

  public auth2: any;
  constructor(private router: Router, private zone: NgZone) { }

  ngOnInit(): void {
    this.checkLocalToken();
    this.renderButton();
  }


  renderButton() {

    this.startApp();

  }

  startApp() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1081018443674-oqlrtf2si5u01vrl03j8mp1bdmm6n4l7.apps.googleusercontent.com',
        discoveyDocs:['https:www.googleapis.com/discovey/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));

    });

  };

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const token = googleUser.getAuthResponse().id_token;
        const access = googleUser.getAuthResponse().access;
        localStorage.setItem("avatarG", googleUser.Ju.AN);
        localStorage.setItem("name1", googleUser.Ju.tf);
        localStorage.setItem("correo", googleUser.Ju.zv);
        localStorage.setItem("acces_token", googleUser.wc.access_token);
        this.zone.run(() => {
          this.router.navigate(['login']);
        });
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
  checkLocalToken() {
    if (localStorage.getItem("tokenL")) {
      this.router.navigate(['vista-general']);
    }
  }

}

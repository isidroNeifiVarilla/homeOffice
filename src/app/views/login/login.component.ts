import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Login } from '../../models/login';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public error: string;
    loginForm: FormGroup;
    submitted=false;
  
    constructor(private fb: FormBuilder,private apiService: ApiService, private router: Router, private firestore: FirestoreService) { 
    
    }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(4)]],
     })
    this.buscaToken();
  }
  get f() { return this.loginForm.controls; }
  onLogin(form: Login){
    this.checkLocalToken();
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }
    this.apiService.onLogin(form).subscribe(
      (response: any) =>{
          localStorage.setItem("token", response.body.info.token);
          this.addleankit();
          this.router.navigate(["vista-general"]);
        },
      err => {
       this.error= "Tu contraseña o correo electrónico son incorrectos"
      }
    );
  }
  checkLocalToken(){
    this.buscaToken();
    if(localStorage.getItem("tokenL")){
      this.router.navigate(['vista-general']);
    }else{
      this.router.navigate(['login'])
    }
  }
  
  addleankit(){
    const addtoken :any = {
      correo: this.loginForm.value.username,
      token: localStorage.getItem("token")
    }
    this.firestore.agregarToken(addtoken).then(()=>{
    })
      
    }
    buscaToken(){
      const correo=  localStorage.getItem("correo");
      this.firestore.getToken(correo).subscribe(data => {
        if (data){
          localStorage.setItem('tokenL', data.token);
          this.router.navigate(['vista-general']);
        }    
      })
    }
  }


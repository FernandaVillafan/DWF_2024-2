import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Usuario } from '../_model/usuario';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../_service/authentication.service';
import { faKey, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { LoginResponse } from '../_model/login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  usernameIcon = faUserSecret;
  passwordIcon = faKey;
  
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  }, [Validators.required])

  public showLoading: boolean;
  private subscriptions: Subscription[] = [];    
  
  constructor(private authenticationService: AuthenticationService) {
    this.showLoading = false;
  }
  
  ngOnInit(): void { }
  
  public onLogin(): void {

    this.showLoading = true;      
    var loginFormValue  = this.loginForm.value;
    var usuario: Usuario = new Usuario();
    usuario.username = loginFormValue['username'];
    usuario.password = loginFormValue['password'];
    
    this.subscriptions.push(
      this.authenticationService.login(usuario).subscribe(
        (response: HttpResponse<LoginResponse>) => {
          if(response.body  === null || response.body.token === null) {
            console.log('La respesta no devuelve el contenido esperado')
            return;
          }

          const token = response.body.token;
          this.authenticationService.saveToken(token);
          if(response.body === null) {
            console.log('La API no devolvió cuerpo en la respuesta');
            return;
          }

          this.authenticationService.addUserToLocalCache(response.body);
          this.showLoading = false;
          window.location.reload();
        },
        (errorResponse: HttpErrorResponse) => {
          alert(errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get fg() {
    return this.loginForm.controls;
  }
}
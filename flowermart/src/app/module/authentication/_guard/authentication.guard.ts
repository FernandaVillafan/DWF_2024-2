import { AuthenticationService } from '../_service/authentication.service'; 
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {

  let isLogged : boolean = inject(AuthenticationService).isUserLoggedIn();

  if (!isLogged) {
    console.log('Redirigiendo a Inicio de Sesión');
    inject(Router).navigate(['login']);
    return false;
  }

  return true;
};
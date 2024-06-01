import { AuthenticationService } from '../../module/authentication/_service/authentication.service';
import { catchError } from 'rxjs/operators';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  constructor(private router: Router, private authService: AuthenticationService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          console.log('No Autorizado');
        }
        if (error instanceof HttpErrorResponse && error.status === 403) {
          console.log('No Autenticado. Inicia sesión para acceder a este recurso.');
        }
        if (error instanceof HttpErrorResponse && error.status === 412) {
          Swal.fire({
            title: 'Sesion expirada',
            text: 'Tu sesión ha expirado. Inicia sesión nuevamente.',
            timer: 5000,
            timerProgressBar: true,
            icon: 'warning',
            showConfirmButton: true
          }).then((result) => {
            if (result.isConfirmed) {
              this.authService.logOut();
              location.reload();
            }
          })
        }
        
        return throwError(error);
      })
    );
  }
}
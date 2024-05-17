import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './module/product/product.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './module/authentication/authentication.module';
import { LayoutModule } from './module/layout/layout.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptorInterceptor } from './core/interceptor/jwt-interceptor.interceptor';
import { CommonsModule } from './module/commons/commons.module';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { ErrorInterceptor } from './core/interceptor/request-error.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    AuthenticationModule,
    CommonsModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptorInterceptor])),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
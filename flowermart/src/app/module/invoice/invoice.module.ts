import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    NgxPhotoEditorModule,
    NgxPaginationModule,
  ]
})

export class InvoiceModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionComponent } from './component/region/region.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerDetailsComponent } from './component/customer-details/customer-details.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { CustomerComponent } from './component/customer/customer.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    RegionComponent,
    CustomerDetailsComponent,
    CustomerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPhotoEditorModule,
    NgxPaginationModule,
  ]
})

export class CustomerModule { }
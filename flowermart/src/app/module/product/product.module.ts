import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CategoryComponent } from './component/category/category.component';
import { ProductComponent } from './component/product/product.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { ProductByCategoryComponent } from './component/product-by-category/product-by-category.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductByCategoryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPhotoEditorModule,
    NgxPaginationModule,
  ]
})

export class ProductModule { }
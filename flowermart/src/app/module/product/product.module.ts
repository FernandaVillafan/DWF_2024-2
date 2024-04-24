import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CategoryComponent } from './component/category/category.component';
import { ProductComponent } from './component/product/product.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';

@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule 
  ]
})

export class ProductModule { }
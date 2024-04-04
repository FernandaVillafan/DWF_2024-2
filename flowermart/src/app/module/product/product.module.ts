import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CategoryComponent } from './component/category/category.component';

@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule 
  ]
})

export class ProductModule { }
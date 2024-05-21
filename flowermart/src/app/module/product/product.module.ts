import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CategoryComponent } from './component/category/category.component';
import { ProductComponent } from './component/product/product.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsDeportesComponent } from './component/products-by-category/products-deportes/products-deportes.component';
import { ProductsLicoreriaComponent } from './component/products-by-category/products-licoreria/products-licoreria.component';
import { ProductsLujoComponent } from './component/products-by-category/products-lujo/products-lujo.component';
import { ProductsModaComponent } from './component/products-by-category/products-moda/products-moda.component';
import { ProductsTecnologiaComponent } from './component/products-by-category/products-tecnologia/products-tecnologia.component';

@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductsDeportesComponent,
    ProductsLicoreriaComponent,
    ProductsLujoComponent,
    ProductsModaComponent,
    ProductsTecnologiaComponent,
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
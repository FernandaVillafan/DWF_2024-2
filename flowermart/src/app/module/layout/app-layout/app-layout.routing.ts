import { Routes } from '@angular/router';
import { CategoryComponent } from '../../product/component/category/category.component';
import { ProductComponent } from '../../product/component/product/product.component';
import { SecuredComponent } from '../../authentication/secured/secured.component';
import { authenticationGuard } from '../../authentication/_guard/authentication.guard';
import { ProductDetailsComponent } from '../../product/component/product-details/product-details.component';
import { HomeComponent } from '../../product/component/home/home.component';
import { InvoiceComponent } from '../../invoice/component/invoice/invoice.component';
import { ProductsDeportesComponent } from '../../product/component/products-by-category/products-deportes/products-deportes.component';
import { ProductsLicoreriaComponent } from '../../product/component/products-by-category/products-licoreria/products-licoreria.component';
import { ProductsLujoComponent } from '../../product/component/products-by-category/products-lujo/products-lujo.component';
import { ProductsModaComponent } from '../../product/component/products-by-category/products-moda/products-moda.component';
import { ProductsTecnologiaComponent } from '../../product/component/products-by-category/products-tecnologia/products-tecnologia.component';

export const AppLayoutRoutes: Routes = [
    { path: 'category', component: CategoryComponent },
    { path: 'product', component: ProductComponent },
    { path: 'product/:gtin', component: ProductDetailsComponent },
    { path: '', component: HomeComponent },
    { path: 'products-deportes', component: ProductsDeportesComponent },
    { path: 'products-licoreria', component: ProductsLicoreriaComponent },
    { path: 'products-lujo', component: ProductsLujoComponent },
    { path: 'products-moda', component: ProductsModaComponent },
    { path: 'products-tecnologia', component: ProductsTecnologiaComponent },
    { path: 'secured', component: SecuredComponent, canActivate : [authenticationGuard] },
    { path: 'invoice', component: InvoiceComponent }
];
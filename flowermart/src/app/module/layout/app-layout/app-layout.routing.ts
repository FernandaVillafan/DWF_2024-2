import { Routes } from '@angular/router';
import { CategoryComponent } from '../../product/component/category/category.component';
import { ProductComponent } from '../../product/component/product/product.component';
import { SecuredComponent } from '../../authentication/secured/secured.component';
import { authenticationGuard } from '../../authentication/_guard/authentication.guard';
import { ProductDetailsComponent } from '../../product/component/product-details/product-details.component';

export const AppLayoutRoutes: Routes = [
    { path: 'category', component: CategoryComponent },
    { path: 'product', component: ProductComponent },
    { path: 'product/:gtin', component: ProductDetailsComponent },
    { path: 'secured', component: SecuredComponent, canActivate : [authenticationGuard] },
];
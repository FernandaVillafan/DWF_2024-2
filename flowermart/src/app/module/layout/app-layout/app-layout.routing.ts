import { Routes } from '@angular/router';
import { CategoryComponent } from '../../product/component/category/category.component';
import { ProductComponent } from '../../product/component/product/product.component';
import { SecuredComponent } from '../../authentication/secured/secured.component';
import { authenticationGuard } from '../../authentication/_guard/authentication.guard';
import { InvoiceComponent } from '../../invoice/component/invoice/invoice.component';

export const AppLayoutRoutes: Routes = [
    { path: 'category', component: CategoryComponent },
    { path: 'product', component: ProductComponent },
    { path: 'secured', component: SecuredComponent, canActivate : [authenticationGuard] },
    // {path: "cliente", component: CustomerComponent },
    // {path: "cliente/:rfc", component: CustomerDetailComponent },
    {path: "factura", component: InvoiceComponent },
    // {path: 'region', component: RegionComponent},
];
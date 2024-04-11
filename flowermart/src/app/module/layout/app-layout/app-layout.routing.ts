import { Routes } from '@angular/router';
import { CategoryComponent } from '../../product/component/category/category.component';
import { SecuredComponent } from '../../authentication/secured/secured.component';
import { authenticationGuard } from '../../authentication/_guard/authentication.guard';

export const AppLayoutRoutes: Routes = [
    { path: '', component: CategoryComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'secured', component: SecuredComponent, canActivate : [authenticationGuard] }
];
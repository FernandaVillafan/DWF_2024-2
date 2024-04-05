import { Routes } from '@angular/router';
import { RegisterComponent } from '../../authentication/register/register.component';
import { LoginComponent } from '../../authentication/login/login.component';
import { SecuredComponent } from '../../authentication/secured/secured.component';
import { authenticationGuard } from '../../authentication/_guard/authentication.guard';
import { CategoryComponent } from '../../product/component/category/category.component';

export const AppLayoutRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'secured', component: SecuredComponent, canActivate : [authenticationGuard] }
];
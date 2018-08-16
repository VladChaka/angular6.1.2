import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from '../component/main-page/main-page.component';
import { AuthenticationFormComponent } from "../component/authentication-form/authentication-form.component";

import { AuthenticationGuard } from "../service/authentication-guard.service";

const routes: Routes = [
    {
        path: 'users',
        component: MainPageComponent,
        // canActivate: [AuthenticationGuard]
    },
    {
        path: '',
        component: AuthenticationFormComponent,
        // canActivate: [AuthenticationGuard]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }

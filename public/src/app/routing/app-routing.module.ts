import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from '../component/main-page/main-page.component';
import { AuthenticationFormComponent } from "../component/authentication-form/authentication-form.component";
import { UserPanelComponent } from "../component/user-panel/user-panel.component";
import {BookListComponent} from "../component/book-list/book-list.component";
import {UserProfileComponent} from "../component/user-profile/user-profile.component";
import {LibraryCardComponent} from "../component/library-card/library-card.component";

import { AuthenticationGuard } from "../service/authentication-guard.service";

const userRoutes: Routes = [
    {
        path: 'books',
        component: BookListComponent
    },
    {
        path: 'librarycard',
        component: LibraryCardComponent
    }
];

const usersRoutes: Routes = [
    {
        path: ':id',
        component: UserProfileComponent,
        children: userRoutes
    }
];

const dashboardRoutes: Routes = [
    {
        path: 'users',
        component: UserPanelComponent,
        children: usersRoutes
    },
    {
        path: 'books',
        component: BookListComponent
    },
];
const routes: Routes = [
    {
        path: 'dashboard',
        component: MainPageComponent,
        children: dashboardRoutes
        // canActivate: [AuthenticationGuard]
    },
    {
        path: 'login',
        component: AuthenticationFormComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
        // canActivate: [AuthenticationGuard]
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from '../component/main-page/main-page.component';
import { AuthenticationFormComponent } from "../component/authentication-form/authentication-form.component";
import { UsersMenuComponent } from '../component/users-menu/users-menu.component';
import { UsersPanelComponent } from '../component/users-panel/users-panel.component';
import {BookListComponent} from "../component/book-list/book-list.component";
import {UserProfileComponent} from "../component/user-profile/user-profile.component";
import {LibraryCardComponent} from "../component/library-card/library-card.component";
import {AddUserComponent} from "../component/add-user/add-user.component";

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
    },
    {
        path: '',
        component: UsersPanelComponent
    }
];

const dashboardRoutes: Routes = [
    {
        path: 'users',
        component: UsersMenuComponent,
        children: usersRoutes
    },
    {
        path: 'user/:id',
        component: UserProfileComponent,
        children: userRoutes
    },
    {
        path: 'add',
        component: AddUserComponent
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
        children: dashboardRoutes,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'login',
        component: AuthenticationFormComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }

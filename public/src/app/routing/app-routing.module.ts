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
        component: BookListComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'librarycard',
        component: LibraryCardComponent,
        canActivate: [AuthenticationGuard]
    }
];

const usersRoutes: Routes = [
    {
        path: ':id',
        component: UserProfileComponent,
        children: userRoutes,
        canActivate: [AuthenticationGuard]
    },
    {
        path: '',
        component: UsersPanelComponent,
        canActivate: [AuthenticationGuard]
    }
];

const dashboardRoutes: Routes = [
    {
        path: 'users',
        component: UsersMenuComponent,
        children: usersRoutes,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'user/:id',
        component: UserProfileComponent,
        children: userRoutes,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'add',
        component: AddUserComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'books',
        component: BookListComponent,
        canActivate: [AuthenticationGuard]
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

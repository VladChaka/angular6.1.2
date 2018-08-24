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

import { AdminMainPageComponent } from '../component/admin-main-page/admin-main-page.component';
import { AdminBookMenuComponent } from '../component/admin-book-menu/admin-book-menu.component';
import { AdminBookListComponent } from "../component/admin-book-list/admin-book-list.component";
import { AdminBooksComponent } from "../component/admin-books/admin-books.component";

import { AuthenticationGuard } from "../service/authentication-guard.service";
import { Error404Component } from '../component/error404/error404.component';

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

const dashboardRoutes: Routes = [
    {
        path: 'myprofile',
        component: UserProfileComponent,
        children: userRoutes,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'books',
        component: BookListComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: '404',
        component: Error404Component
    },
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
const adminBookRoutes: Routes = [
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
const adminMainRoutes: Routes = [
    {
        path: 'users',
        component: UsersMenuComponent,
        children: usersRoutes,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'myprofile',
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
        component: AdminBookMenuComponent,
        children: adminBookRoutes,
        canActivate: [AuthenticationGuard]
    },
    {
        path: '404',
        component: Error404Component
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
        path: 'admin',
        component: AdminMainPageComponent,
        children: adminMainRoutes,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'login',
        component: AuthenticationFormComponent
    },
     {
       path: '**',         
       redirectTo: '/dashboard/404'
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

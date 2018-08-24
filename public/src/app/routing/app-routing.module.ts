import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from '../component/main-page/main-page.component';
import { AuthenticationFormComponent } from "../component/authentication-form/authentication-form.component";
import { UsersMenuComponent } from '../component/users-menu/users-menu.component';
import { UsersPanelComponent } from '../component/users-panel/users-panel.component';
import {BooksComponent} from "../component/books/books.component";
import {LibraryCardComponent} from "../component/library-card/library-card.component";
import {AddUserComponent} from "../component/add-user/add-user.component";

import {UserProfileComponent} from "../component/user-profile/user-profile.component";
import { ProfileBooklistComponent } from '../component/profile-booklist/profile-booklist.component';

import {AdminUserProfileComponent} from "../component/admin-user-profile/admin-user-profile.component";
import { AdminMainPageComponent } from '../component/admin-main-page/admin-main-page.component';
import { AddBookComponent } from "../component/add-book/add-book.component";
import { AdminBooksComponent } from "../component/admin-books/admin-books.component";

import { AuthenticationGuard } from "../service/authentication-guard.service";
import { Error404Component } from '../component/error404/error404.component';

const profileRoutes: Routes = [
    {
        path: 'librarycard',
        component: LibraryCardComponent,
        canActivate: [AuthenticationGuard]
    }
];

const adminProfileRoutes: Routes = [
    {
        path: 'librarycard',
        component: LibraryCardComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'booklist',
        component: ProfileBooklistComponent,
        canActivate: [AuthenticationGuard]
    }
];

const usersRoutes: Routes = [
    {
        path: ':id',
        component: AdminUserProfileComponent,
        children: adminProfileRoutes,
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
        component: AdminUserProfileComponent,
        children: adminProfileRoutes,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'adduser',
        component: AddUserComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'addbook',
        component: AddBookComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'books',
        component: AdminBooksComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: '404',
        component: Error404Component
    },
];

const dashboardRoutes: Routes = [
    {
        path: 'myprofile',
        component: UserProfileComponent,
        children: profileRoutes,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'books',
        component: BooksComponent,
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
    //  {
    //    path: '**',         
    //    redirectTo: '/dashboard/404'
    // },
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

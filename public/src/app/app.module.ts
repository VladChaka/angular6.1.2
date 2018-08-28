import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './routing/app-routing.module';
import {NgxPaginationModule} from "ngx-pagination";
import { AuthenticationFormComponent } from './component/authentication-form/authentication-form.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { LibraryCardComponent } from './component/library-card/library-card.component';
import { UsersMenuComponent } from './component/users-menu/users-menu.component';
import { UsersPanelComponent } from './component/users-panel/users-panel.component';
import { AddUserComponent } from './component/add-user/add-user.component';

import {BooksComponent} from './component/books/books.component';
import { BookBlockComponent } from './component/book-block/book-block.component';
import { UserBlockComponent } from './component/user-block/user-block.component';
import { Error404Component } from './component/error404/error404.component';
import { AdminMainPageComponent } from './component/admin-main-page/admin-main-page.component';
import { AddBookComponent } from './component/add-book/add-book.component';
import { AdminBookBlockComponent } from './component/admin-book-block/admin-book-block.component';
import { AdminBooksComponent } from './component/admin-books/admin-books.component';
import { AdminUserProfileComponent } from './component/admin-user-profile/admin-user-profile.component';
import { ProfileBooklistComponent } from './component/profile-booklist/profile-booklist.component';

@NgModule({
  declarations: [
    MainPageComponent,
    AuthenticationFormComponent,
    UserProfileComponent,
    LibraryCardComponent,
      UsersMenuComponent,
    BookBlockComponent,
    BooksComponent,
      UsersPanelComponent,
      AddUserComponent,
      UserBlockComponent,
      Error404Component,
      AdminMainPageComponent,
      AddBookComponent,
      AdminBookBlockComponent,
      AdminBooksComponent,
      AdminUserProfileComponent,
      ProfileBooklistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  exports: [ ],
  bootstrap: [AuthenticationFormComponent]
})
export class AppModule { }

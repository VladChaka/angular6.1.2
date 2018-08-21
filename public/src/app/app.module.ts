import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './routing/app-routing.module';
import {NgxPaginationModule} from "ngx-pagination";
import { AuthenticationFormComponent } from './component/authentication-form/authentication-form.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { FormAddUserComponent } from './component/form-add-user/form-add-user.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { ProfileControlPanelComponent } from './component/profile-control-panel/profile-control-panel.component';
import { LibraryCardComponent } from './component/library-card/library-card.component';
import { UsersMenuComponent } from './component/users-menu/users-menu.component';
import { UsersPanelComponent } from './component/users-panel/users-panel.component';

import { LoginValidationDirective } from './directive/login-validation.directive';
import { BookListComponent } from './component/book-list/book-list.component';

@NgModule({
  declarations: [
    MainPageComponent,
    FormAddUserComponent,
    LoginValidationDirective,
    AuthenticationFormComponent,
    UserProfileComponent,
    ProfileControlPanelComponent,
    LibraryCardComponent,
      UsersMenuComponent,
    BookListComponent,
      UsersPanelComponent
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

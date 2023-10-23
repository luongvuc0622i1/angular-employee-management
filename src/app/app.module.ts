import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {Auth_interceptor} from "./service/auth_interceptor";
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './account/header/header.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ProfileEmployeeComponent } from './profile-employee/profile-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    HomeComponent,
    HeaderComponent,
    ListEmployeeComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
    ProfileEmployeeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
      HttpClientModule,
      MatDialogModule,
      ReactiveFormsModule,
      BrowserAnimationsModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Auth_interceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

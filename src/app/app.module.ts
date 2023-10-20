import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {Auth_interceptor} from "./service/auth_interceptor";
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './account/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    HomeComponent,
    HeaderComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
      HttpClientModule
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

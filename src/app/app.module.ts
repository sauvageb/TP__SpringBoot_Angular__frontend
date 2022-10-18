import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AddBookComponent} from './components/add-book/add-book.component';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {HttpClientModule} from "@angular/common/http";

import {DatePipe, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {FormsModule} from "@angular/forms";
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/profile/profile.component';
import {authInterceptorProviders} from "./helpers/auth.interceptors";

registerLocaleData(localeEn, 'en');

@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    BookDetailsComponent,
    BookListComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    authInterceptorProviders,
    {provide: LOCALE_ID, useValue: 'en-EN'}, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

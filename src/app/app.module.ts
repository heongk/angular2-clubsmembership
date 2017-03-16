import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material'
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import 'hammerjs';

const firebaseConfig = {
 apiKey: "AIzaSyBHbjed1U3qhrKHjvuANgEzf9TuWsQee9s",
    authDomain: "hhhd-27e4f.firebaseapp.com",
    databaseURL: "https://hhhd-27e4f.firebaseio.com",
    storageBucket: "hhhd-27e4f.appspot.com",
    messagingSenderId: "394432419968"
}

export const firebaseAuthConfig = {
  provider: AuthProviders.Anonymous,
  method: AuthMethods.Anonymous,
};


@NgModule({
  declarations: [
  AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

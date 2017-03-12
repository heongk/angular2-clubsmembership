import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { ClubsModule } from './clubs/clubs.module';
import { ClubDetailedComponent } from './club-detailed/club-detailed.component';

const appRoutes: Routes = [
  { path: '',
    pathMatch: 'full',
    component : AppComponent
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [
  AppComponent,
  ClubDetailedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ClubsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

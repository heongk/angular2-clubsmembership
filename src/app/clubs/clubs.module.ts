import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubsComponent } from './clubs.component';
import { MaterialModule } from '@angular/material'
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
  CommonModule,
  MaterialModule,
  RouterModule.forChild([
  {
  	path: 'clubnew',
	component : ClubsComponent,
  },
  ]),
  ],
  exports: [
   ClubsComponent,
  ],
  declarations: [ClubsComponent,]
})
export class ClubsModule { }

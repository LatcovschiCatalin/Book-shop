import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewDetailsRoutingModule } from './view-details-routing.module';
import { ViewDetailsComponent } from './view-details.component';


@NgModule({
  declarations: [
    ViewDetailsComponent
  ],
  imports: [
    CommonModule,
    ViewDetailsRoutingModule
  ]
})
export class ViewDetailsModule { }

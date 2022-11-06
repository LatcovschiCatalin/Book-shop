import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table.component';
import {SharedModule} from "../../shared/shared.module";
import {TableRoutingModule} from "./table-routing.module";


@NgModule({
  declarations: [
    TableComponent
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TableRoutingModule
  ]
})
export class TableModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomTableComponent} from './custom-table/custom-table.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    CustomTableComponent
  ],
  exports: [
    CustomTableComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class SharedModule {
}

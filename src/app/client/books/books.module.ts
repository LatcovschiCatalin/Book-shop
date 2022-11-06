import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BooksRoutingModule} from './books-routing.module';
import {BooksComponent} from './books.component';
import {NavbarComponent} from './navbar/navbar.component';
import {MatSelectModule} from "@angular/material/select";
import {CookieService} from "ngx-cookie-service";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BooksComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatSelectModule,
    FormsModule,
  ],
  providers: [CookieService]
})
export class BooksModule {
}

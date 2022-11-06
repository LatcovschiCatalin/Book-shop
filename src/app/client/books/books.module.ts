import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BooksRoutingModule} from './books-routing.module';
import {BooksComponent} from './books.component';
import {NavbarComponent} from './navbar/navbar.component';
import {MatSelectModule} from "@angular/material/select";
import {CookieService} from "ngx-cookie-service";
import {FormsModule} from "@angular/forms";
import {FooterComponent} from './footer/footer.component';
import {ServicesModule} from "../services/services.module";
import {CrudService} from "../../server/crud/crud.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    BooksComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BooksRoutingModule,
    MatSelectModule,
    FormsModule,
    ServicesModule,
  ],
  providers: [CookieService, CrudService]
})
export class BooksModule {
}

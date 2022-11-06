import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  mode = 'dark'

  constructor(
    private cookieService: CookieService
  ) {
    this.mode = this.cookieService.get('mode') || 'dark';
  }

  ngOnInit() {
  }

}



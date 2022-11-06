import {Component, OnInit} from '@angular/core';
import {QueryParamsService} from "../../../services/query-params.service";
import {CrudService} from "../../../../server/crud/crud.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  mode = 'dark'
  columns = [
    {
      key: 'id',
      name: 'Id',
    },
    {
      key: 'title',
      name: 'Title',
    },
    {
      key: 'author',
      name: 'Author',
    },
    {
      key: 'price',
      name: 'Price',
    },
  ];
  actions: object[] = []

  constructor(
    public qpService: QueryParamsService,
    public service: CrudService,
    private cookieService: CookieService
  ) {
    this.mode = this.cookieService.get('mode') || 'dark';
    this.actions = [
      {
        key: 'edit',
        name: 'Edit'
      },
      {
        key: 'view',
        name: 'View'
      },
      {
        key: 'delete',
        name: 'Delete'
      },

    ]
  }

  ngOnInit() {
    this.qpService.deleteParam('id');
  }

}

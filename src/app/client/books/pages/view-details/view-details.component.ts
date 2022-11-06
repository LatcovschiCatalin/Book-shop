import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CrudService} from "../../../../server/crud/crud.service";

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {
  id: any;
  data: any;
  keys = [];

  constructor(private router: Router, private service: CrudService) {
    let routes = this.router.url.split('/');
    this.id = routes[routes.length - 1];
  }

  ngOnInit(): void {
    this.service.getById(this.id).subscribe((res) => {
      this.data = res;
      // @ts-ignore
      this.keys = Object.keys(this.data);
    })
  }

  back() {
    this.router.navigate(['']);
  }

}

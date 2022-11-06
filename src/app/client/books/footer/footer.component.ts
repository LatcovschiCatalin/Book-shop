import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  mode = 'dark';
  media = [
    {
      key: "linkedin",
      link: "https://www.linkedin.com/in/c%C4%83t%C4%83lin-latcovschi-28372220b/"
    },
    {
      key: "github",
      link: "https://github.com/catalin572"
    }
  ]

  constructor(private cookieService: CookieService) {
    this.mode = this.cookieService.get('mode') || 'dark';
  }

  ngOnInit(): void {
  }

}

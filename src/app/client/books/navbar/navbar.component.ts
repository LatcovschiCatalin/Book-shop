import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  variables = ["--primary-bg", "--secondary-bg", "--text", "--shadow", "--select", "--odd", "--input-bg"]
  themes = {
    light: {
      "--primary-bg": '#edf1f7',
      "--secondary-bg": '#fff',
      "--text": '#222b45',
      "--shadow": 'rgb(44 51 73 / 10%)',
      "--select": '#edf1f7',
      "--odd": '#f7f9fc',
      "--input-bg": 'rgba(31, 31, 31, 0.5)'
    },

    dark: {
      "--primary-bg": '#151a30',
      "--secondary-bg": '#222b45',
      "--text": '#fff',
      "--shadow": '#1a1f33',
      "--select": '#151a30',
      "--odd": '#192038',
      "--input-bg": 'rgba(255, 255, 255, 0.3)'
    }

  }

  selected = 'dark'
  data = {
    title: "Gold Books"
  }
  modes = [
    {
      key: "light",
      value: "Light"
    },
    {
      key: "dark",
      value: "Dark"
    }
  ]


  constructor(public cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.setTheme(this.cookieService.get('mode') || this.selected);
  }

  getMode(e: any) {
    this.selected = e;
    this.cookieService.set('mode', e);
    this.setTheme(e);
    window.location.reload();
  }

  setTheme(e: any) {
    this.selected = e;
    for (let i = 0; i < this.variables.length; i++) {
      // @ts-ignore
      document.documentElement.style.setProperty(this.variables[i], this.themes[e][this.variables[i]]);
    }

  }

}

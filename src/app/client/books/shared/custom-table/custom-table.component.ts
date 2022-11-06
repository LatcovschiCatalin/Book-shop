import {Component, Input, OnDestroy, OnInit, ViewEncapsulation,} from '@angular/core';
import {QueryParamsService} from "../../../services/query-params.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, Validators} from "@angular/forms";
import {CrudService} from "../../../../server/crud/crud.service";
import {Book} from "../../../../server/crud/book";

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class CustomTableComponent implements OnInit, OnDestroy {
  @Input() tableConfig: any;

  @Input() set columns(event: any) {
    this.sourceColumns = event;
    // @ts-ignore
    this.displayedColumns = [...this.sourceColumns?.map(el => el.key), 'actions'];
  };


  displayedColumns: any;
  sourceColumns: any;
  limit = [10, 20, 50, 100];
  limit_docs = 10;
  page = 1;
  add = false;
  data: any;
  changedData: any;
  pageData: any;
  show_sort = false;
  searchTerm = '';
  sort = '';
  order = 'ASC'
  observables: Subscription[] = [];
  width = window.innerWidth - 370;
  fieldWidth: any;
  mode = '';
  id = '-1';
  // @ts-ignore
  obj: Book;
  validators = {
    type: 'required',
    message: 'required field'
  }

  formData = [
    {
      title: 'Title',
      key: 'title',
      type: 'text',
      default: '',
      validators: this.validators
    },
    {
      title: 'Author',
      key: 'author',
      type: 'text',
      default: '',
      validators: this.validators
    },
    {
      title: 'Price',
      key: 'price',
      type: 'text',
      default: '',
      validators: this.validators
    },
  ]

  customForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    price: ['', Validators.required],
  });


  constructor(private service: CrudService, private formBuilder: FormBuilder, private qpService: QueryParamsService, private route: ActivatedRoute, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.mode = this.cookieService.get('mode') || 'dark';
    this.showSort(false);
    this.fieldWidth = (this.width - 126) / this.width * 100 / (this.displayedColumns.length - 1) / 100 * this.width;
    this.observables.push(this.route.queryParams.subscribe(res => {
      this.sort = res['sort'] || '';
      this.order = res['order'] || 'ASC';
      this.searchTerm = res['searchTerm'] || '';
      if (res['page']) {
        this.page = Number(res['page']);
      } else {
        this.qpService.updateParam('page', 1);
        this.page = 1;
      }

      if (res['limit']) {
        this.limit_docs = Number(res['limit']);
      } else {
        this.qpService.updateParam('limit', 10);
        this.limit_docs = 10;
      }
    }))
    this.getData();
  }

  showSort(show: boolean) {
    this.show_sort = show;
    if (!this.show_sort) {
      this.qpService.deleteParams({'sort': null, 'order': null});
    }
  }

  sortData(sort: any, order?: any) {
    if (this.show_sort) {
      let field = '';
      let ord = '';
      this.observables.push(this.route.queryParams.subscribe(res => {
        field = res['sort'] || '';
        ord = res['order'] === 'ASC' && field === sort ? 'DES' : 'ASC';
      }));
      ord = order ? order : ord;
      this.qpService.updateParams({sort: sort, order: ord});
      this.sort = sort;
      this.order = ord;
      this.changedData.sort((a: any, b: any) => (ord == 'DES' ? a[sort] < b[sort] : a[sort] > b[sort]) ? 1 : -1)
      this.refreshPage();
    }
  }

  search() {
    this.qpService.updateParams({searchTerm: this.searchTerm});
    this.changedData = this.data.filter((el: any) => {
      let keys = Object.keys(el).filter(key => (
        key !== 'image'
      ))
      let finalRow: any = {};
      for (let a = 0; a < keys.length; a++) {
        finalRow[keys[a]] = el[keys[a]]
      }
      return JSON.stringify(finalRow).toLowerCase().includes(this.searchTerm);
    })
    this.sortData(this.sort, this.order);
    this.refreshPage();
  }

  getData() {
    this.tableConfig?.service.get().subscribe((data: any) => {
      this.qpService.updateParam('totalItems', data.length);
      this.data = data || [];
      this.search();
      this.refreshPage();
    });
  }

  onDelete(id: any) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.tableConfig?.service.deleteById(id).subscribe(() => {
        this.getData();
      });
    }
  }

  onPaginateChange(e: any) {
    if (e.pageSize !== this.limit_docs) {
      this.limit_docs = e.pageSize;
      this.page = 1;
      this.qpService.updateParam('limit', this.limit_docs);
    } else if (e.pageIndex + 1 !== this.page) {
      this.page = Number(e.pageIndex) + 1;
      this.qpService.updateParam('page', this.page);
    }
    this.refreshPage();
  }

  refreshPage() {
    let total = this.changedData?.length;
    let finalData: object[] = [];
    let initial = (this.page - 1) * this.limit_docs;
    let next = initial + this.limit_docs;
    let last = next > total ? total : next;
    for (let i = initial; i < last; i++) {
      finalData.push(this.changedData[i])
    }
    this.pageData = finalData.filter((el: any) => {
      return el
    })
  }

  onAction(key: any, id?: any) {
    switch (key.toLowerCase()) {
      case 'delete': {
        this.onDelete(id);
        break;
      }
      case 'add': {
        this.qpService.deleteParam('id');
        this.id = '-1';
        if (this.add) {
          this.submit();
        } else {
          this.refreshForm();
        }
        this.add = true;
        break;
      }
      case 'edit': {
        this.add = false;
        this.id = id;
        this.refreshForm();
        this.qpService.updateParam('id', id);
        break;
      }
      case 'save': {
        this.submit();
        this.qpService.deleteParam('id');
        this.id = '-1';
        break;
      }
    }
  }

  submit() {
    if (this.customForm.invalid) {
      this.customForm.markAllAsTouched();
      return false;
    } else {
      // @ts-ignore
      this.obj = this.customForm.value;
      if (this.id != '-1') {
        this.service.put(this.obj, this.id).subscribe(() => {
          this.getData();
          this.refreshForm();
          this.id = '-1';
        });

      } else {
        this.service.post(this.obj).subscribe(() => {
          this.getData();
          this.refreshForm();
          this.add = false;
        });

      }
      return true;
    }
  }

  refreshForm() {
    let data: Book = {
      title: '',
      author: '',
      price: ''
    };
    if (this.id != '-1') {
      this.service.getById(this.id).subscribe((res) => {
        data = res;
        this.customForm = this.formBuilder.group({
          title: [data.title, Validators.required],
          author: [data.author, Validators.required],
          price: [data.price, Validators.required],
        });

      })
    } else {
      this.customForm = this.formBuilder.group({
        title: ['', Validators.required],
        author: ['', Validators.required],
        price: ['', Validators.required],
      });
    }
  }

  ngOnDestroy() {
    this.observables.forEach(obs => {
      obs.unsubscribe();
    })
  }

}

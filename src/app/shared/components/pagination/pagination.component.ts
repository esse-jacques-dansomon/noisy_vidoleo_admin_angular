import {Component, Input, OnInit} from '@angular/core';
import {RequestMeta} from "../../../data/models/request-meta";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor() { }

  @Input()   meta : RequestMeta = { current_page: 1, from: 1, last_page: 1, per_page: 10, total: 0 } ;
  @Input()   loadPage(page: number) {
      this.meta.current_page = page;
    }
  ngOnInit(): void {
  }

}

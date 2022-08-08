import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loader-submit',
  templateUrl: './loader-submit.component.html',
  styleUrls: ['./loader-submit.component.scss']
})
export class LoaderSubmitComponent implements OnInit {

  constructor() { }

  @Input() isLoading: boolean = false;
  ngOnInit(): void {
  }

}

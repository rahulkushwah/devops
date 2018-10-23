import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'iedsp-no-data-found',
  templateUrl: './no-data-found.component.html',
  styleUrls: ['./no-data-found.component.scss']
})
export class NoDataFoundComponent implements OnInit {
  @Input() icon: string = "warning";
  @Input() text: string = "data";
  @Output() tryAgain : EventEmitter<string> = new EventEmitter<string>()
  constructor() { }

  ngOnInit() {
  }

  clickTryAgain() {
    this.tryAgain.emit(this.text);
  }
  

}

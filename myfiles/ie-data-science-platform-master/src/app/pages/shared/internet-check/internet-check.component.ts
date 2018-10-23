import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'internet-check',
  templateUrl: './internet-check.component.html',
  styleUrls: ['./internet-check.component.scss']
})
export class InternetCheckComponent implements OnChanges {
  @Input() hasConnection: boolean = true;
  @Output() closeToast: EventEmitter<any> = new EventEmitter<any>(); 
  constructor(public appService: AppService) { }

  ngOnChanges() {
  }

  close() {
    this.closeToast.emit(false);
  }

}

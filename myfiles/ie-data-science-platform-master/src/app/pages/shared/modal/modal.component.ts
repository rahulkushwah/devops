import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'iedsp-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title: string = 'Modal';
  @Input() icon: string;
  @Input() action: string = 'Confirm';
  @Input() loading: boolean = false;
  @Output() actionEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit() {
  }

  actionClick() {
    this.actionEvent.emit(this.action);
  }

  closeModal() {
    this.dialogRef.close();
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sort } from '@angular/material';

@Component({
  selector: 'iedsp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() dataList: any[] = [];
  @Input() headers: string[] = [];
  @Input() actions: string[];

  @Output() emitAction: EventEmitter<any> = new EventEmitter<any>();

  iconList: any = {
    'start': 'play_arrow',
    'stop': 'stop',
    'delete': 'delete_forever',
    'download': 'file_download',
    'get logs': 'file_download'
  }

  sortedData: any[];


  constructor() { }

  ngOnInit() {
    this.sortedData = this.dataList.slice();
  }

  getKeys(row) {
    return Object.keys(row);
  }

  actionClick(action: string, row: any) {
    this.emitAction.emit({
      action: action,
      row: row
    });
  }

  sortData(sort: Sort) {
    const data = this.dataList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      if(sort.active && sort.active.length > 0){
        return this.compare(a[Object.keys(a)[this.headers.indexOf(sort.active)]], b[Object.keys(b)[this.headers.indexOf(sort.active)]], isAsc);
      }
      else {
        return 0;
      }
      // switch (sort.active) {
      //   case 'name': return this.compare(a.name, b.name, isAsc);
      //   case 'calories': return this.compare(a.calories, b.calories, isAsc);
      //   case 'fat': return this.compare(a.fat, b.fat, isAsc);
      //   case 'carbs': return this.compare(a.carbs, b.carbs, isAsc);
      //   case 'protein': return this.compare(a.protein, b.protein, isAsc);
      //   default: return 0;
      // }
    });
  }
  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  checkLink(data: string): boolean {
    return typeof data == 'string' && (data.indexOf('http:/') == 0 || data.indexOf('https:/') == 0) ? true : false;
  }
}

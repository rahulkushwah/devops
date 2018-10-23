import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  open: boolean = false;

  myStyle: object = {};
  myParams: any = {};
  width: number = 100;
  height: number = 100;

  constructor(public appService: AppService) { }

  ngOnInit() {
    this.myStyle = this.appService.myStyle;
    let params: any = JSON.parse(JSON.stringify(this.appService.myParams));
    // params.particles.color.value = '#c1c1c1';
    // params.particles.shape.stroke.color = '#c1c1c1';
    // params.particles.line_linked.color = '#c1c1c1';
    // params.particles.line_linked.opacity = 0.6;
    this.myParams = params;
    this.width = this.appService.width;
    this.height = this.appService.height;
    this.appService.aboutAppBehavior.subscribe(data=> {
      this.open = data;
    })
  }

  close() {
    this.appService.aboutAppBehavior.next(false);
  }

}

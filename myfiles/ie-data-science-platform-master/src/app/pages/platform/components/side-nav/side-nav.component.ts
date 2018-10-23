import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'iedsp-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() drawer: any;
  activeLinkIndex: number = 0;
  routeLinks: any[];
  user: User;
  constructor(public router: Router, public appService: AppService) { }

  ngOnInit() {
    this.user = this.appService.getUser();
    this.routeLinks = [
      {
          label: 'Clusters',
          link: './clusters',
          index: 0,
          icon: 'blur_on',
          role: null
      }, 
      {
          label: 'Data',
          link: './data',
          index: 1,
          icon: 'cloud_upload',
          role: null
      }, 
      {
          label: 'Admin',
          link: './admin',
          index: 3,
          icon: 'vpn_key',
          role: 'admin',
          subRoutes: [
            {
                label: 'User management',
                link: './admin/manageusers',
                index: 3.1
            }, 
            {
                label: 'Cluster Management',
                link: './admin/manageclusters',
                index: 3.2
            }
          ]
      }, 
      {
          label: 'Logs',
          link: './logs',
          index: 4,
          icon: 'file_copy',
          role: null
      }
    ]
    this.activeLinkIndex = this.getSelectedRouteIndex(this.router.routerState.snapshot.url, this.routeLinks);
  }

  getSelectedRouteIndex(url: string, routeLinks: any[]){
    let startIn: number = url.lastIndexOf('/');
    let selectedIndex: number = 0;
    routeLinks.forEach((item: any) => {
      if(item.link.substr(1, item.link.length) === url.substr(startIn, url.length)){
        selectedIndex = item.index;
      }
    })
    return selectedIndex;
  }

  getWholeNum(num: number) {
    return Math.floor(num);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { PlatformService } from './services/platform.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.page.html',
  styleUrls: ['./platform.page.scss']
})
export class PlatformPage implements OnInit {
  expandLeftPanel: boolean = true;
  rating: number = 0;
  user: any;
  constructor(public router: Router, public appService: AppService, 
    public platformService: PlatformService, public localStorage: LocalStorage) { }

  ngOnInit() {
    this.user = this.appService.getUser();
  }

  logout(sidenavAccount, logoutTemplate) {
    sidenavAccount.toggle();
    this.platformService.openModal(logoutTemplate);
    
  }

  logOutUser() {
    this.platformService.closeModal();
    this.localStorage.removeItem('lmuser').subscribe(()=> {

      this.router.navigate(['login']);
    });
  }

  submitFeedback() {    
    this.platformService.closeModal();
  }

  cancel() {
    this.platformService.closeModal();
  }

  aboutApp(sidenavAccount) {    
    sidenavAccount.toggle();
    this.appService.aboutAppBehavior.next(true);
  }

}

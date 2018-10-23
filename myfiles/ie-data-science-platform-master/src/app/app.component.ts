import { Component } from '@angular/core';
import { AppService } from './app.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    
})
export class AppComponent {
  showtoast: boolean = false;
  hasConnection: boolean = true;
  constructor(private appService: AppService, private updates: SwUpdate) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => {
        document.location.reload(true);
      })
    })
   // updates.checkForUpdate();
    this.appService.isConnected.subscribe(isConnected => {
      if(isConnected != null){
        this.hasConnection = isConnected;
        this.showtoast = true;
        if(this.hasConnection){
          setTimeout(() => {
            this.showtoast = false;
          }, 4000);
        }
      }
    })
  }
  hideToast(data) {
    this.showtoast = false;
  }
}

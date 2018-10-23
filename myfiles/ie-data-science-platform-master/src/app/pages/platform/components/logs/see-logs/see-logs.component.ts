import { Component, OnInit } from '@angular/core';
import { PlatformService } from '../../../services/platform.service';
import { AppService } from '../../../../../app.service';

@Component({
  selector: 'app-see-logs',
  templateUrl: './see-logs.component.html',
  styleUrls: ['./see-logs.component.scss']
})
export class SeeLogsComponent implements OnInit {
  config: any= {
    title: 'Logs',
    icon: 'file_copy',
    action: 'Download'
  }

  loading: boolean;

  logContent: string;

  constructor(public appService: AppService, public platformService: PlatformService) { }

  ngOnInit() {
    this.loading = true;
    if(this.platformService.logModalClusterName) {
      this.platformService.getClusterLogs(this.appService.getUser().id, this.platformService.logModalClusterName)
        .subscribe((result: any) => {
          console.log(result)
          if(typeof result == "string"){
            this.logContent = result;
          }
          this.loading = false;
        }, error => {
          console.log(error);
          this.loading = false;
        })
    }
  }


  
  downloadLogs(data) {
      let now = new Date();
      let formattedDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ':' 
                + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
      this.platformService.dyanmicDownloadByHtmlTag({
        fileName: this.platformService.logModalClusterName + '-log-' + formattedDate,
        text: this.logContent,
        fileType: 'text/plain'
      })
  }

}

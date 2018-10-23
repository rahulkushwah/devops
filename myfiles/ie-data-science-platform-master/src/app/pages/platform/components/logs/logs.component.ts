import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../../../../app.service';
import { PlatformService } from '../../services/platform.service';
import { SeeLogsComponent } from './see-logs/see-logs.component';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  fetchingData: boolean = false;
  data: any;
  headers: string[];
  logContent: string;
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }
  constructor(public appService: AppService, public platformService: PlatformService) { }

  ngOnInit() {
    this.fetchingData = true;
    this.platformService.getLogs(this.appService.getUser().id).subscribe((result: any) => {
      console.log(result);
      this.data = result.data;
      this.headers = result.headers;
      this.fetchingData = false;
    },error => {
      console.log(error);
      this.fetchingData = false;
    })

    this.logContent = "spawn jupyter notebook password\rEnter password: \rVerify password: \r[NotebookPasswordApp] Wrote hashed password to /root/.jupyter/jupyter_notebook_config.json\rinvalid command name \"f\"    while executing\"f\"    (file \"passwd.sh\" line 10)\r[I 08:28:08.577 NotebookApp] Writing notebook server cookie secret to /root/.local/share/jupyter/runtime/notebook_cookie_secret[I 08:28:08.830 NotebookApp] Serving notebooks from local directory: /[I 08:28:08.830 NotebookApp] The Jupyter Notebook is running at:[I 08:28:08.830 NotebookApp] http://(dab691d61518 or 127.0.0.1):8888/[I 08:28:08.830 NotebookApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation)."
    // setTimeout(() => {
    //   this.fetchingData = false;
    //   this.logContent = 
    //             'This is just a sample text for testing.\r\nCreated by Areek Ray';
    // }, 2000);
  }

  downloadLogs(data) {
    if(!this.logContent || this.logContent.length == 0){
      this.appService.openSnackBar('No Log found!', 'Ok');
    }
    else {
      let now = new Date();
      let formattedDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ':' 
                + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
      this.platformService.dyanmicDownloadByHtmlTag({
        fileName: this.appService.getUser().id + '-log-' + formattedDate,
        text: this.logContent,
        fileType: 'text/plain'
      })
    }
  }

  tryAgain(event) {
    this.ngOnInit();
  }

  onTableAction(data) {
    if(data && data.action == 'get logs') {
      this.openLogsModal(data);
    }
  }

  openLogsModal(data){
    this.platformService.logModalClusterName = data.row.name;
    if(window.innerWidth > 800){
      this.platformService.openModal(SeeLogsComponent, 75, 60);
    }
    else{
      this.platformService.openModal(SeeLogsComponent, 80, 100);
    }
  }
}

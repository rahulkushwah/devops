import { Component, OnInit } from '@angular/core';
import { PlatformService } from '../../services/platform.service';
import { UploadComponent } from './upload/upload.component';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  selectedFolderIndex: number = 0;
  headers: string[] = ['name', 'last modified'];
  userFiles: any[];
  globalFiles: any[];
  fetchingGlobalData: boolean = false;
  fetchingUserData: boolean = false;
  
  constructor(public platformService: PlatformService, public appService: AppService) { }

  ngOnInit() {
   this.fetchData(this.selectedFolderIndex);
   
    
  }

  openUploadModal(data) {
    if(window.innerWidth > 800){
      this.platformService.openModal(UploadComponent, 70, 50);
    }
    else{
      this.platformService.openModal(UploadComponent, 80, 100);
    }
  }

  changeChange(event) {
    this.selectedFolderIndex = this.selectedFolderIndex === 0 ? 1 : 0;
    this.fetchData(this.selectedFolderIndex);
    //alert('TabChange :' + this.selectedFolderIndex);
  }

  fetchData(selectedFolderIndex) {
    if(selectedFolderIndex == 0 ){
      this.fetchingGlobalData = true;
      this.globalFiles = !!this.platformService.appData.globalFiles ? this.platformService.appData.globalFiles.data : null;
      this.platformService.configureAws();
      this.platformService.getAllFilesS3().then(data => {
        
        this.fetchingGlobalData = false;
        this.globalFiles = [];
        this.globalFiles = data;
        this.platformService.appData.globalFiles = {
          headers: this.headers,  
          data: data
        };

      }).catch(err => {
        console.log(err);
        this.fetchingUserData = false;
      });
    }
    else {
      this.fetchingUserData = true;
      this.userFiles = !!this.platformService.appData.userFiles ? this.platformService.appData.userFiles.data : null;
      this.platformService.configureAws();
      this.platformService.getAllFilesS3(this.appService.getUser().id).then(data => {
        
        this.fetchingUserData = false;
        this.userFiles = [];
        this.userFiles = data;
        this.platformService.appData.userFiles = {
          headers: this.headers,  
          data: data
        };

      }).catch(err => {
        console.log(err);
        this.fetchingUserData = false;
      });
    }
  }

  fetchGlobaData() {
    // this.platformService.getAllFilesS3();
    // return [
    //     {
    //       name: 'safdjahsasdjhsdjfhsdjhfjshfjsfhsjdh'
    //     },
    //     {
    //       name: 'safdjahsasdjhsdjfhsdjhfjshfjsfhsjdh'
    //     },{
    //       name: 'safdjahsasdjhsdjfhsdjhfjshfjsfhsjdh'
    //     },{
    //       name: 'safdjahsasdjhsdjfhsdjhfjshfjsfhsjdh'
    //     },{
    //       name: 'safdjahsasdjhsdjfhsdjhfjshfjsfhsjdh'
    //     }
    //   ]
  }

  fetchUserData() {
    return null;
  }

  onTableAction(data: any) {
    if(data.action == 'download') {
      this.platformService.downloadFileFromS3(data.row.name, this.selectedFolderIndex == 0 ? null : this.appService.getUser().id);
    }
    else if(data.action == 'delete'){
      this.platformService.deleteFileFromS3(data.row.name, this.selectedFolderIndex == 0 ? null : this.appService.getUser().id).then((message: string) => {
        this.appService.openSnackBar(message, 'Ok');
        this.ngOnInit();
      }).catch((err: string) => {
        this.appService.openSnackBar(err, 'Ok');
      });
    }
  }

}

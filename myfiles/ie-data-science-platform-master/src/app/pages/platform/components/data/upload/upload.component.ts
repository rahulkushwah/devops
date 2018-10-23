import { Component, OnInit } from '@angular/core';
import { PlatformService } from '../../../services/platform.service';
import { AppService } from '../../../../../app.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  config: any = {
    title: 'Upload to S3',
    icon: 'cloud_upload',
    action: 'Upload'
  }

  file: any;
  fileName: string;
  selectedFolder: string;

  constructor(public appService: AppService, public platformService: PlatformService) { }

  ngOnInit() {
  }

  chooseFile(event) {
    if(event && event.target && event.target.files && event.target.files.length > 0){
      this.file = event.target.files[0];
    }
  }

  uploadFile(e: any) {
    if(this.fileName && this.fileName.length > 0 && this.file && this.selectedFolder){
      this.platformService.uploadFileToS3(this.selectedFolder == 'global' ? null : this.appService.getUser().id, 
        this.file, this.fileName).then(data =>{
          this.platformService.closeModal();
          this.appService.openSnackBar('File Uploaded Successfully', 'Ok', null, 'left');
          
      }).catch(err => {
        this.platformService.closeModal();
        this.appService.openSnackBar(err.message, 'Ok', null, 'left');
      });
    }
    else{
      alert('Select all fields');
    }
    

  }

}

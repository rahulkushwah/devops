import { Component, OnInit } from '@angular/core';
import { CreateUserComponent } from './create-user/create-user.component';
import { PlatformService } from '../../../services/platform.service';
import { AppService } from '../../../../../app.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  fetchingData:boolean = false;
  headers: string[];
  data: any[];
  constructor(public platformService: PlatformService, public appService: AppService) { }

  ngOnInit() {
    this.fetchingData = true;
    this.headers = !!this.platformService.appData.users ? this.platformService.appData.users.headers : [];
    this.data = !!this.platformService.appData.users ? this.platformService.appData.users.data : [];
    this.platformService.getAllUsers(this.appService.getUser().id).subscribe((result: any) => {
      console.log(result);
      this.headers = result.headers ?  result.headers : [];
      this.data = this.platformService.formatTableData(result.data ? result.data : [], result.label);
      this.platformService.appData.users = {
        headers: result.headers,
        data: this.data
      }
      this.fetchingData = false;
    },error => {
      console.log(error);
      this.fetchingData = false;
      this.appService.openSnackBar('Something Went Wrong!', 'Ok');
    })
  }

  openCreateUserModal(data){
    if(window.innerWidth > 800){
      this.platformService.openModal(CreateUserComponent, 75, 60);
    }
    else{
      this.platformService.openModal(CreateUserComponent, 80, 100);
    }
  }

  tryAgain(event) {
    this.ngOnInit();
  }

}

import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../../../app.service';
import { PlatformService } from '../../../../services/platform.service';
import { NewUser } from '../../../../../../models/new-user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  config: any= {
    title: 'Create User',
    icon: 'account_circle',
    action: 'Create'
  }

  loading: boolean = false;

  newUser: NewUser

  headers = ['Bucket Name', 'Read', "Write", "Deny"];

  s3BucketList = [
      {
        name: "Test 1",
        permission: 
          {
            read: false,
            write: false,
            deny: true
          }
      },
      {
        name: "Test 2",
        permission: 
          {
            read: false,
            write: false,
            deny: true
          }
        
      }
    ];

  constructor(public appService: AppService, public platformService: PlatformService) { 
    this.newUser = new NewUser(null, null, null, null, null);
  }

  ngOnInit() {
  }

  test() {
    console.log(this.s3BucketList);
  }

  getKeys(data) {
    return Object.keys(data);
  }

  createNewUser(event) {
    this.newUser.s3bucketlist = this.s3BucketList;
    if(!this.validateObj(this.newUser)){
      this.appService.openSnackBar('Please select/fill all fields!', 'Ok', null, 'left');
    }
    else {
      this.loading = true;
      this.platformService.createNewUser(this.appService.getUser().id, this.newUser).subscribe(result => {
        console.log(result);
        this.platformService.closeModal();
        this.loading = false;
        if(typeof result == "string") {
          this.appService.openSnackBar(result, 'Ok', null, 'left');
        }
        else{
          this.appService.openSnackBar('Something Went Wrong!', 'Ok', null, 'left');
        }

      },error => {
        console.log(error);
        this.platformService.closeModal();
        this.loading = false;
        this.appService.openSnackBar('Something Went Wrong!', 'Ok', null, 'left');
      })
    }    
  }

  validateObj(obj) {
    let isValid:boolean = true;
    Object.keys(obj).forEach(key => {
      if( !obj[key] || obj[key].length == 0){
        isValid = false;
      }
    })
    return isValid;
  }

  changeBucketPermission(row, field) {
    row.permission[field] = !row.permission[field];

    switch(field){
      case 'read':
        if(row.permission[field]) {
          row.permission.deny = false;
        }
        else if(!row.permission[field] && !row.permission.write) {
          row.permission.deny = true;
        }
        break;
      case 'write':
        if(row.permission[field]) {
          row.permission.deny = false;
        }
        else if(!row.permission[field] && !row.permission.read) {
          row.permission.deny = true;
        }
        break;
      case 'deny':
        if(row.permission[field]) {
          row.permission.read = false;
          row.permission.write = false;
        }
        else {
          row.permission.read = true;
          row.permission.write = true;
        }
        break;
      default:
        break;
    }
    
  }

}

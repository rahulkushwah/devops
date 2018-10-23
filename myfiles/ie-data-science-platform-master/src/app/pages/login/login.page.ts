import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  
  username: string = '';
  password: string = '';
  rememberMe: boolean = true;
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  isLoggingIn: boolean = false;

  constructor(public appService: AppService, public router: Router, public localStorage: LocalStorage) { }

  ngOnInit() {
    this.myStyle = this.appService.myStyle;
    this.myParams = this.appService.myParams;
    this.width = this.appService.width;
    this.height = this.appService.height;
  }

  login() {
    if(!this.username || this.username.length < 1 || !this.password || this.password.length < 1){
      this.appService.openSnackBar('Empty username/password', 'Ok', true);
    }else {
      this.isLoggingIn = true;
      if((this.username == 'admin' && this.password == 'admin') || (this.username == 'n0349979' && this.password == 'admin') 
        || (this.username == 'n0348668' && this.password == 'user')) {
          
          setTimeout(() => {
            switch(this.username) {
              case 'n0348668':
                this.appService.setUser(this.username, this.username, 'user'); 
                break;
              default:
                this.appService.setUser(this.username, this.username, 'admin');          
                break;                     
            }
            
            if(this.rememberMe) {
              this.localStorage.setItem('lmuser',this.appService.getUser()).subscribe(data =>{
                console.log('Local storage saved!');
              });
            }          
            this.router.navigate(['app']);
  
            this.isLoggingIn = false;  
          }, 1000);
          
      }
      // this.appService.login(this.username, this.password).subscribe(data => {
      //   //console.log(data);
      //   if(data.group == 'ADMIN'){
      //     this.appService.setUser('n002', this.username, 'admin');          
      //     this.router.navigate(['app']);
      //   }
      //   else {
      //     this.appService.setUser('n003', this.username, 'user');      
      //     this.router.navigate(['app']);
      //   }
      //   if(this.rememberMe) {
      //     this.localStorage.setItem('lmuser',this.appService.getUser()).subscribe(data =>{
      //       console.log('Local storage saved: ' + data);
      //     });
      //   }
      //   this.isLoggingIn = false;        
      // },
      // error => {
      //   this.isLoggingIn = false;
      //   this.appService.openSnackBar('Something Went Wrong!', 'Ok', true); 
      // })
      
    }
    
  }

  knowMore() {
    this.appService.aboutAppBehavior.next(true);
  }

}

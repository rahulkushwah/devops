import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AppService } from './app.service';

@Injectable()

export class AppGuardService implements CanActivate {
    constructor(public appService: AppService, public router: Router, protected localStorage: LocalStorage) {}
    canActivate(routeSnapShot: ActivatedRouteSnapshot): Promise<boolean> {        
        return this.checkRoute(routeSnapShot);
    }

    checkRoute(routeSnapShot): Promise<boolean> {
        return new Promise(resolve => {
            if(routeSnapShot && routeSnapShot.url && routeSnapShot.url && routeSnapShot.url.length > 0 ){
                switch(routeSnapShot.url[0].path){
                    case 'app':
                        this.localStorage.getItem<any>('lmuser').subscribe((user) => {
                            if(user && user.id){
                                this.appService.setUser(user.id, user.name, user.role);
                                return resolve(true);
                            }
                            else {
                                if(this.appService.getUser()) {
                                    return resolve(true);
                                }
                                else{
                                    this.router.navigate(['login']); 
                                    return resolve(false);
                                }
                            }
                        });                    
                        break;  
                    case 'login':
                        this.localStorage.getItem<any>('lmuser').subscribe((user) => {
                            if(user && user.id){                                
                                this.appService.setUser(user.id, user.name, user.role);
                                this.router.navigate(['app']);                        
                                return resolve(false);
                            }
                            else {
                                return resolve(true);
                            }
                        });                    
                        break;
                    default:
                        break;
                }
            }
        })
    }
}
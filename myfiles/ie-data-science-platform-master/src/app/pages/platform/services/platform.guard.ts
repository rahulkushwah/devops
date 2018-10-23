import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AppService } from '../../../app.service';
import { User } from '../../../models/user';

@Injectable()

export class PlatformGuard implements CanActivate {
    user: User;
    constructor(public appService: AppService, public router: Router) {

    }
    canActivate(routeSnapShot: ActivatedRouteSnapshot): boolean {        
        if(routeSnapShot && routeSnapShot.url && routeSnapShot.url && routeSnapShot.url.length > 0 ){
            if(routeSnapShot.url[0].path == 'admin'){
                this.user = this.appService.getUser();
                if(this.user && this.user.role == 'admin'){
                    return true;
                }
                else {
                    this.router.navigate(['clusters']);
                }
            }
        }
        return false;
    }

}
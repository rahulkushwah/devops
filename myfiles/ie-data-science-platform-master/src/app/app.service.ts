import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ConnectionService } from 'ng-connection-service';
import { User } from './models/user';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Api } from './api/api';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseUrl: string = environment.baseUrl;
  private user: User;
  isConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  setUser(id, name, role) {
    this.user = new User(id, name, role);
  }

  getUser(){
    return this.user;
  }

  aboutAppBehavior:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  constructor(public snackBar: MatSnackBar, private connectionService: ConnectionService, 
    public http: HttpClient) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected.next(isConnected);
    })
    this.initParticleJS();
  }

  initParticleJS() { 
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'pointer-events': 'none'
    };
    this.myParams = {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#ffffff"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#ffffff"
          },
        },
        opacity: {
          value: 1,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 1.5,
          random: true,
          anim: {
            enable: false,
            speed: 20,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#c1c1c1",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      }
    };
  }

  openSnackBar(message: string, action: string, type?:boolean, position?: string, duration?: number){

    let classname = !!type ? 'accent-snackbar': 'primary-snackbar';
    if(position == 'left'){
      this.snackBar.open(message, action, {
        duration: 20000,
        panelClass: [classname],
        horizontalPosition: "left", 
        verticalPosition: "bottom"
      });
    }
    else if(position == 'right' || !position){
      this.snackBar.open(message, action, {
        duration: 2000,
        panelClass: [classname],
        horizontalPosition: "right", 
        verticalPosition: "bottom"
      });
    }
    
    
  }
  
  login(username: string, password: string): Observable<any> {
    //let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('password', password);

    let data  = { 'username': username, 'password': password }

    return this.http.post(`${this.baseUrl + Api.LOGIN}`, data, options);
  }


}

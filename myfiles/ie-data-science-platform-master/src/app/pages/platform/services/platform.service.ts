import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import * as aws from 'aws-sdk';
import { File } from '../../../models/data-objects/file';
import { AppData } from '../../../models/app-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Api } from '../../../api/api';
import { s3config } from '../../../api/s3config';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private baseUrl: string = environment.baseUrl;
  albumBucketName = 'intl-reg-data-science-platform';
  globalFolder = 'n0000000';
  //bucketRegion = 'us-east-1';
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }
  //identityPoolId = 'us-east-1:e9a78f29-7fd5-4f7f-b28b-4a5543f5a1bb';
  
  logModalClusterName: string;

  appData: AppData;

  options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  constructor(public dialog: MatDialog, public http: HttpClient) {
    this.appData =  new AppData(null, null, null, null, null, null);
  }

  getUserClusters(userId: string): Observable<any> {
    let data = {userId: userId};
    return this.http.post(`${this.baseUrl + Api.GET_USER_CLUSTERS}`, data, this.options);
  }

  createCluster(cluster: any, userId: string): Observable<any>{
    let data  = {
      "userId": userId,
      "type" : cluster.name,
      "cluster": {
            "workloadType": cluster.workLoadType ? cluster.workLoadType : null,
            "instanceType": cluster.instanceType ? cluster.instanceType : null,
            "instanceSize": cluster.instanceSize ? cluster.instanceSize : null,
            "image": cluster.selectedImg ? cluster.selectedImg : null,
            "nodeCount": cluster.numberOfNodes ? cluster.numberOfNodes : null
       }
      }
    return this.http.post(`${this.baseUrl + Api.CREATE_CLUSTER}`, data,  this.options);
  }

  startCluster(clusterName: string, userId: string){
    let data = {
      userId: userId,
      clusterName: clusterName
    }
    return this.http.post(`${this.baseUrl + Api.START_CLUSTER}`, data,  this.options);
  }

  stopCluster(clusterName: string, userId: string){
    let data = {
      userId: userId,
      clusterName: clusterName
    }
    return this.http.post(`${this.baseUrl + Api.STOP_CLUSTER}`, data,  this.options);
  }

  deleteCluster(clusterName: string, userId: string){
    let data = {
      userId: userId,
      clusterName: clusterName
    }
    return this.http.post(`${this.baseUrl + Api.DELETE_CLUSTER}`, data,  this.options);
  }

  getAllClustersAdmin(userId: string){
    let data = {userId: userId};
    return this.http.post(`${this.baseUrl + Api.GET_ALL_CLUSTERS}`, data, this.options);
  }

  getAllUsers(userId) {
    let data = {userId: userId};
    return this.http.post(`${this.baseUrl + Api.GET_ALL_USERS}`, data, this.options);
  }

  createNewUser(userId: string, newUser: any) {
    let data = {userId: userId, newUserDetails: newUser};
    return this.http.post(`${this.baseUrl + Api.CREATE_USER}`, data, this.options);
  }


  getLogs(userId: string) { 
    let data = {userId: userId};
    return this.http.post(`${this.baseUrl + Api.GET_LOGS}`, data, this.options);
  }

  getClusterLogs(userId: string, clusterName: string){
    let data = {userId: userId, clusterName: clusterName};
    return this.http.post(`${this.baseUrl + Api.GET_CLUSTER_LOGS}`, data, this.options);
  }



  

  openModal(component: any, height?: number, width?: number, data? : any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    if(height && width){
      dialogConfig.width = width + '%';
      dialogConfig.height = height + '%'; 
    } 

    dialogConfig.data = data;
    this.dialog.open(component, dialogConfig);
  }

  closeModal() {
    this.dialog.closeAll();
  }

  configureAws() {
    if(aws) {
      aws.config.update(s3config);
    }
  }

  getAllFilesS3(userId? : string) : Promise<any> {
    return new Promise((resolve, reject) => {
      if(aws) {
        let params = {
          Bucket: this.albumBucketName,
          Prefix: !!userId ? userId : this.globalFolder
        };
        const s3 = new aws.S3();
          
        s3.listObjects(params, function(err, data) {
          if (err) reject(err); // an error occurred
          else  { 
            let files = data.Contents.filter(item => item.Key.lastIndexOf('/') != item.Key.length - 1 ) 
              resolve(files.map(item => {
                return new File(item.Key, item.LastModified.getFullYear() + '-' + (item.LastModified.getMonth() + 1) + '-' + item.LastModified.getDate() + ' ' 
                            + (item.LastModified.getHours() > 12 ? item.LastModified.getHours() - 12 : item.LastModified.getHours() )  + ':' + (item.LastModified.getMinutes() < 10 ? '0'+item.LastModified.getMinutes() : item.LastModified.getMinutes()) + (item.LastModified.getHours() > 12 ? ' pm' : ' am' ) )
                // return {
                //   "name": item.Key,
                //   "lastModified": item.LastModified.getFullYear() + '-' + (item.LastModified.getMonth() + 1) + '-' + item.LastModified.getDate() + ' ' 
                //                   + (item.LastModified.getHours() > 12 ? item.LastModified.getHours() - 12 : item.LastModified.getHours() )  + ':' + (item.LastModified.getMinutes() < 10 ? '0'+item.LastModified.getMinutes() : item.LastModified.getMinutes()) + (item.LastModified.getHours() > 12 ? ' pm' : ' am' ) 
                // } 
            }))
          }    
        });        
      }
    });
  }

  downloadFileFromS3(key: string, userId: string) {
    if(aws) {
      const s3 = new aws.S3();
      s3.getObject(
        { Bucket: this.albumBucketName, Key: key },
          (error, data) => {
          if (error != null) {
            alert("Failed to retrieve an object: " + error);
          } else {
            this.dyanmicDownloadByHtmlTag({
              fileName: key,
              text: data.Body.toString(),
              fileType: data.ContentType
            })
            // do something with data.Body
          }
        }
      );
    }
  }

  uploadFileToS3(userId: string, file: any, name: string) {
    return new Promise((resolve, reject) => {
      if(aws) {
        const s3 = new aws.S3();
        s3.upload({ Key: (userId ? userId : this.globalFolder) + '/' + name, Bucket: this.albumBucketName, Body: file, ACL: 'public-read'}, function (err, data) {
          if (err) {
            reject(err);
          }
          else{
            resolve(data);
          }
        });
      }
      else {
        reject('Missing AWS Client');
      }
    })
  }

  deleteFileFromS3(filename: string, userId?: string) {
    return new Promise((resolve, reject) => {
      if(aws) {
        let params = {
          Bucket: this.albumBucketName,
          Key: filename
        };
        const s3 = new aws.S3();
        s3.deleteObject(params, function (err, data) {
          if (data) {
              resolve("File deleted successfully");
          }
          else {
              reject(err.message);
          }
        });
      }
      else {
        reject('Missing AWS Client');
      }
    })
  }

  dyanmicDownloadByHtmlTag(arg: { fileName: string, text: string, fileType: string }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileType;
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  formatTableData(dataList: any[], labels: string[]) {
    let data: any[] = [];
    dataList.forEach((element, index) => {
      let obj = {}
      labels.forEach(label => {
        obj[label] = element[label];
      });
      data.push(obj);
    });
    return data;
  }

  changeClusterState(datalist: any[], name, state: string) {
    datalist.some(cluster =>{ 
      if(cluster.name == name){
        cluster.State = state;
        return true;
      }
    });
    return datalist;
  }
}

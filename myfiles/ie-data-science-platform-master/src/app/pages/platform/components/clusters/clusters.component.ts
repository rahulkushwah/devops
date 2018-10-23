import { Component, OnInit, NgZone } from '@angular/core';
import { PlatformService } from '../../services/platform.service';
import { CreateClusterComponent } from './create-cluster/create-cluster.component';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.scss']
})
export class ClustersComponent implements OnInit {

  fetchingData: boolean = false;

  headers: string[];
  data: any[];
  constructor(public platformService: PlatformService, public appService: AppService,
    public ngZoneService: NgZone) { }

  ngOnInit() {
    this.fetchingData = true;
    this.headers = !!this.platformService.appData.clusters ? this.platformService.appData.clusters.headers : [];
    this.data = !!this.platformService.appData.clusters ? this.platformService.appData.clusters.data : [];

    this.platformService.getUserClusters(this.appService.getUser().id).subscribe(result => {
      console.log(result);
      this.headers = result.headers ?  result.headers : [];
      this.data = [];
      this.ngZoneService.run(()=> {
        return true;
      }); 
      this.data = this.platformService.formatTableData(result.data ? result.data : [], result.label);
      this.platformService.appData.clusters = {
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

  openCreateClusterModal(data){
    if(window.innerWidth > 800){
      this.platformService.openModal(CreateClusterComponent, 82, 50, this.callbackModal);
    }
    else{
      this.platformService.openModal(CreateClusterComponent, 80, 100, this.callbackModal);
    }
  }

  callbackModal() {
    this.tryAgain(null);
  }

  onTableAction(data) {
    switch(data.action) {
      case 'start':
        this.appService.openSnackBar('Starting cluster ' + data.row.name, 'Hide', null, 'left');
        this.platformService.startCluster(data.row.name, this.appService.getUser().id).subscribe(result => {
          if(typeof result == 'string') {
            this.appService.openSnackBar(result, 'Ok', null, 'left');
            this.data = [];
            this.ngZoneService.run(()=> {
              return true;
            });
            this.data = this.platformService.changeClusterState(this.platformService.appData.clusters.data, data.row.name, 'RUNNING');
            this.platformService.appData.clusters = this.data;
          }
          else {
            this.appService.openSnackBar('Something Went Wrong!', 'Ok', null, 'left');
          }
        }, error => {
          //console.log(error);
          this.appService.openSnackBar('Something Went Wrong!', 'Ok', null, 'left');
        });
        break;
      case 'stop':
        this.appService.openSnackBar('Stopping cluster ' + data.row.name, 'Hide', null, 'left');
        this.platformService.stopCluster(data.row.name, this.appService.getUser().id).subscribe(result => {
          if(typeof result == 'string') {
            this.appService.openSnackBar(result, 'Ok', null, 'left');
            this.data = [];
            this.ngZoneService.run(()=> {
              return true;
            });
            this.data = this.platformService.changeClusterState(this.platformService.appData.clusters.data, data.row.name, 'Stopped');
            this.platformService.appData.clusters = this.data;
          }
          else {
            this.appService.openSnackBar('Something Went Wrong!', 'Ok', null, 'left');
          }
        }, error => {
          //console.log(error);
          this.appService.openSnackBar('Something Went Wrong!', 'Ok', null, 'left');
        });
        break;
      case 'delete':
        this.appService.openSnackBar('Deleting cluster ' + data.row.name, 'Hide', null, 'left');
        this.platformService.deleteCluster(data.row.name, this.appService.getUser().id).subscribe(result => {
          if(typeof result == 'string') {
            this.appService.openSnackBar(result, 'Ok', null, 'left');
          }
          else {
            this.appService.openSnackBar('Something Went Wrong!', 'Ok', null, 'left');
          }
          this.ngOnInit();
        }, error => {
          this.appService.openSnackBar('Something Went Wrong!', 'Ok', null, 'left');
        });
        break;
      default:
        break;
    }
  }

  tryAgain(event) {
    this.ngOnInit();
  }
}

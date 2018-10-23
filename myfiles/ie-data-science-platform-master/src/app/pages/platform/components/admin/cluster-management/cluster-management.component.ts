import { Component, OnInit, NgZone } from '@angular/core';
import { PlatformService } from '../../../services/platform.service';
import { CreateClusterComponent } from '../../clusters/create-cluster/create-cluster.component';
import { AppService } from '../../../../../app.service';

@Component({
  selector: 'app-cluster-management',
  templateUrl: './cluster-management.component.html',
  styleUrls: ['./cluster-management.component.scss']
})
export class ClusterManagementComponent implements OnInit {
  fetchingData: boolean = false;
  data: any[];
  headers: string[]
  constructor(public platformService: PlatformService, public appService: AppService, 
    public ngZoneService: NgZone) { }

  ngOnInit() {
    this.fetchingData = true;
    this.headers = !!this.platformService.appData.allClusters ? this.platformService.appData.allClusters.headers : [];
    this.data = !!this.platformService.appData.allClusters ? this.platformService.appData.allClusters.data : [];
    this.platformService.getAllClustersAdmin(this.appService.getUser().id).subscribe((result: any) => {
      this.headers = result.headers;
      this.data = [];
      this.ngZoneService.run(()=> {
        return true;
      }); 
      this.data = this.platformService.formatTableData(result.data, result.label);
      this.platformService.appData.allClusters = {
        headers: result.headers,
        data: this.data
      }
      this.fetchingData = false;
    }, error => {
      console.log(error);
      this.fetchingData = false;
      this.appService.openSnackBar('Something Went Wrong!', 'Ok');
    })
  }

  openCreateClusterModal(data){
    if(window.innerWidth > 800){
      this.platformService.openModal(CreateClusterComponent, 70, 50);
    }
    else{
      this.platformService.openModal(CreateClusterComponent, 80, 100);
    }
  }

  tryAgain(event) {
    this.ngOnInit();
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

}

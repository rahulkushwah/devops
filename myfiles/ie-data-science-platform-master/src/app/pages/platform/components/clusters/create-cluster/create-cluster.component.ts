import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { PlatformService } from '../../../services/platform.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Development } from '../../../../../models/development-environment';
import { Emr } from '../../../../../models/emr-environment';
import { Docker } from '../../../../../models/docker-enviroment';
//import { WorkingEnvironment } from '../../../../../models/working-environment';
import { AppService } from '../../../../../app.service';
//import { IEnvironment } from '../../../../../models/IEvironment';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-create-cluster',
  templateUrl: './create-cluster.component.html',
  styleUrls: ['./create-cluster.component.scss']
})
export class CreateClusterComponent implements OnInit, OnDestroy {
  
  loading: boolean = false;
  subscriptionList: Subscription[] = [];
  labels: any= {
    name: 'Work Environment',
    workLoadType: 'Workload Type',
    instanceType: 'Instance Type',
    instanceSize: 'Instance Size',
    selectedImg: 'Selected Image',
    numberOfNodes: 'Number of nodes'
  }

  selectedVal: string;

  environmentObj: any;

  workingEnvironments: any[] = [
    { name: 'Development', value: 'Dev'},
    { name: 'EMR', value: 'EMR'},
    { name: 'Docker Cluster', value: 'Docker'}
  ]

  config: any = {
    title: 'Create Enviroment',
    icon: 'blur_on',
    action: 'Create'
  }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(public platformService: PlatformService, public appService: AppService,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.environmentObj = {
      name: '',
      workLoadType: '',
      instanceType: '',
      instanceSize: '',
      selectedImg: '',
      numberOfNodes: ''
    };
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl1: ['', Validators.required],
      secondCtrl2: ['', Validators.required],
      secondCtrl3: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl1: ['',  [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      thirdCtrl2: ['', Validators.required]
    })
  }

  onValChange(value) {
    switch(this.selectedVal) {
      case this.workingEnvironments[0].value:
        this.environmentObj = new Development(this.workingEnvironments[0].value, '', '', '', '');     
        if(!this.thirdFormGroup.controls.thirdCtrl2){
          this.thirdFormGroup.addControl('thirdCtrl2', new FormControl('', Validators.required));
        }  
        if(!!this.thirdFormGroup.controls.thirdCtrl1) {
          this.thirdFormGroup.removeControl('thirdCtrl1');
        }
        console.log(this.thirdFormGroup.controls);
        break;
      case this.workingEnvironments[1].value:
        this.environmentObj = new Emr(this.workingEnvironments[1].value, '', '', '', '');        
        if(!this.thirdFormGroup.controls.thirdCtrl1){
          this.thirdFormGroup.addControl('thirdCtrl1', new FormControl('',  [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]));
        }  
        if(!!this.thirdFormGroup.controls.thirdCtrl2) {
          this.thirdFormGroup.removeControl('thirdCtrl2');
        }
        console.log(this.thirdFormGroup.controls);
        break;
      case this.workingEnvironments[2].value:
        this.environmentObj = new Docker(this.workingEnvironments[2].value, '', '', '', '', '');
        if(!this.thirdFormGroup.controls.thirdCtrl2){
          this.thirdFormGroup.addControl('thirdCtrl2', new FormControl('', Validators.required));
        }  
        if(!this.thirdFormGroup.controls.thirdCtrl1){
          this.thirdFormGroup.addControl('thirdCtrl1', new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]));
        }        
        console.log(this.thirdFormGroup.controls);
        break;
      default:
        //this.environmentObj = new WorkingEnvironment('','', '', '');
        this.environmentObj = {
          name: '',
          workLoadType: '',
          instanceType: '',
          instanceSize: '',
          selectedImg: '',
          numberOfNodes: ''
        };
    }
  }

  closeModal() {
    this.platformService.closeModal();
  }

  test(stepper) {
    console.log(stepper)
  }


  getKeys(obj) {
    return Object.keys(obj);
  }

  createEvironment(action) {
    if(!this.validateObj(this.environmentObj)) {
      this.appService.openSnackBar('Please select/fill all fields!', 'Ok', null, 'left');
    }
    else {
      this.loading = true;
      let subscription: Subscription = this.platformService.createCluster(this.environmentObj, this.appService.getUser().id).subscribe(data => {
        //console.log(data);
        this.loading = false;
        if(typeof data == "string") {
          this.appService.openSnackBar(data, 'Ok', null, 'left');
         // this.callbackModal();
        }
        else {
          this.appService.openSnackBar('Something Went Wrong!', 'Ok', null, 'left');
        }
        this.platformService.closeModal();
      }, error => {
        //console.log(error);
        this.loading = false;
        this.appService.openSnackBar('Something Went Wrong!', 'Ok', null, 'left');
        this.platformService.closeModal();
        //this.callbackModal();
      });

      this.subscriptionList.push(subscription);
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


  ngOnDestroy(): void {
    // this.subscriptionList.forEach(subscription => {
    //   subscription.unsubscribe();
    // })
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformPage } from './platform.page';
import { PlatformRouterModule } from './platform.routes';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatDialogModule, MatRadioModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatSelectModule, MatTooltipModule, MatTabsModule, MatProgressBarModule, MatStepperModule, MatSortModule } from '@angular/material';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ClustersComponent } from './components/clusters/clusters.component';
import { DataComponent } from './components/data/data.component';
import { LogsComponent } from './components/logs/logs.component';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { ClusterManagementComponent } from './components/admin/cluster-management/cluster-management.component';
import { HeaderComponent } from '../shared/header/header.component';
import { NoDataFoundComponent } from '../shared/no-data-found/no-data-found.component';
import { TableComponent } from '../shared/table/table.component';
import { PlatformService } from './services/platform.service';
import { CreateClusterComponent } from './components/clusters/create-cluster/create-cluster.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { UploadComponent } from './components/data/upload/upload.component';
import { CreateUserComponent } from './components/admin/user-management/create-user/create-user.component';
import { PlatformGuard } from './services/platform.guard';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SeeLogsComponent } from './components/logs/see-logs/see-logs.component';

@NgModule({
  imports: [
    //BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    PlatformRouterModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatDialogModule, 
    MatRadioModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule, 
    MatSlideToggleModule, MatSelectModule, MatTooltipModule, MatTabsModule, MatProgressBarModule,
    MatStepperModule, MatSortModule
  ],
  declarations: [
    PlatformPage, SideNavComponent, ClustersComponent, DataComponent, LogsComponent, 
    UserManagementComponent, ClusterManagementComponent, HeaderComponent, NoDataFoundComponent, 
    TableComponent, CreateClusterComponent, ModalComponent, UploadComponent, CreateUserComponent, SeeLogsComponent
  ],
  entryComponents: [CreateClusterComponent, UploadComponent, CreateUserComponent, SeeLogsComponent],
  providers: [PlatformService, PlatformGuard]
})
export class PlatformModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlatformPage } from './platform.page';
import { ClustersComponent } from './components/clusters/clusters.component';
import { DataComponent } from './components/data/data.component';
import { LogsComponent } from './components/logs/logs.component';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { ClusterManagementComponent } from './components/admin/cluster-management/cluster-management.component';
import { PlatformGuard } from './services/platform.guard';

const routes: Routes = [
    { path: '', component: PlatformPage, children: [
        { path: 'clusters', component: ClustersComponent },
        { path: 'data', component: DataComponent },
        { path: 'admin', canActivate: [PlatformGuard], children: [
            { path: 'manageusers', component: UserManagementComponent },
            { path: 'manageclusters', component: ClusterManagementComponent },
            { path: '', redirectTo: 'manageusers' }
        ] },
        { path: 'logs', component: LogsComponent },
        { path: '', redirectTo: 'clusters' }
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRouterModule { }
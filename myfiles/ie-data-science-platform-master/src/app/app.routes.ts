import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { AppGuardService } from './app.guard';
//import { PlatformModule } from './pages/platform/platform.module';

const routes: Routes = [
    { path: 'login', component: LoginPage, canActivate: [AppGuardService] },
    { path: 'app', loadChildren: './pages/platform/platform.module#PlatformModule', canActivate: [AppGuardService]  },
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule { }
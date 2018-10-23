import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { AppRouterModule } from './app.routes';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSnackBarModule, MatProgressBarModule } from '@angular/material';
import { ParticlesModule } from 'angular-particle';
import { AppService } from './app.service';
import { AboutComponent } from './pages/shared/about/about.component';
import { AppGuardService } from './app.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { InternetCheckComponent } from './pages/shared/internet-check/internet-check.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    AboutComponent,
    InternetCheckComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
   // CommonModule,
    FormsModule,
    HttpClientModule,
    AppRouterModule,
    ParticlesModule,
    MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSnackBarModule, MatProgressBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [ AboutComponent ],
  providers: [ AppService, AppGuardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

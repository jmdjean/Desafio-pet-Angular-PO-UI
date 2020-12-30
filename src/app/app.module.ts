import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './views/home/home.component';
import { TopNavBarComponent } from './layout/top-nav-bar/top-nav-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PoStorageModule } from '@po-ui/ng-storage';
import { PoSyncModule } from '@po-ui/ng-sync';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavBarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    AppRoutingModule,
    NgbModule,
    NgxSpinnerModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    PoStorageModule.forRoot(),
    PoSyncModule
  ],
  providers: [

  ],
  exports: [
    NgxMaskModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

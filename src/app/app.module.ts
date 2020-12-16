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
    SharedModule
  ],
  providers: [],
  exports: [
    NgxMaskModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

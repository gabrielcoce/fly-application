import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import {
  APP_BASE_HREF,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { Services } from './app.service';
import { CreateVueloComponent } from './components/create-vuelo/create-vuelo.component';
import { EditVueloComponent } from './components/edit-vuelo/edit-vuelo.component';
import { DeleteVueloComponent } from './components/delete-vuelo/delete-vuelo.component';
import { GetVueloComponent } from './components/get-vuelo/get-vuelo.component';
import { HomeComponent } from './components/home/home.component';
import { PrimengModule } from './primeng.module';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import gt from 'dayjs/locale/es';
import { MessageService } from 'primeng/api';
dayjs.extend(localizedFormat);

@NgModule({
  declarations: [
    AppComponent,
    CreateVueloComponent,
    EditVueloComponent,
    DeleteVueloComponent,
    GetVueloComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PrimengModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    Services,
    MessageService,
    {
      provide: APP_BASE_HREF,
      useValue: '/fligth-system/',
    },
    // {
    //   provide: LocationStrategy, useClass: HashLocationStrategy,
    // }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    dayjs.locale(gt);
  }
}

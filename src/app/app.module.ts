import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { MainComponent } from './main/main.component';
import { FilterSectionComponent } from './main/filter-section/filter-section.component';
import { InsightsComponent } from './main/insights/insights.component';
import { InsightComponent } from './main/insights/insight/insight.component';
import {BaseRequestOptions, HttpModule} from '@angular/http';
import {routing} from './app.routing';
import {MockBackend} from '@angular/http/testing';
import {ComboBoxModule} from 'ng2-combobox';
import {RemoteAPIService} from './_services/remote-api.service';
import {LoadingModule} from 'ngx-loading';
import { Formulario911Component } from './main/formulario911/formulario911.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FilterSectionComponent,
    InsightsComponent,
    InsightComponent,
    Formulario911Component
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    routing,
    ComboBoxModule,
    LoadingModule
  ],
  providers: [
    MockBackend,
    BaseRequestOptions,
    RemoteAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

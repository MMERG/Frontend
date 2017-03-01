import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import 'hammerjs';
import { FormService } from './form.service';
import { DialogComponent } from './dialog.component';
import { CountryListComponent } from './countrylist.component';
import { CityListComponent} from './citylist.component';

// Angular 2 root module
@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    CountryListComponent,
    CityListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [
    FormService
  ],
  bootstrap: [
    AppComponent,
    CountryListComponent,
    CityListComponent
  ]
})
export class AppModule { }

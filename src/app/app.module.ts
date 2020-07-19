import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import{HeaderComponent} from '../header.component/header.component';

@NgModule({
  declarations: [
    AppComponent,HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,MatButtonModule,MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

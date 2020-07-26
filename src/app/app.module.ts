import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import{HeaderComponent} from '../header.component/header.component';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { BodyComponent } from './body.component/body.component';
@NgModule({
  declarations: [
    AppComponent,HeaderComponent, BodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
MatInputModule,
MatToolbarModule,
MatIconModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

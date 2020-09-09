import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{HeaderComponent} from '../header.component/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyComponent } from './body.component/body.component';
import {AuthInterceptor} from "./auth/signup/auth-interceptor";
import { ErrorInterceptor } from "./error-interceptor";
import {  AngularMaterialModule } from './angular-material.module'
import {  ErrorComponent } from './error/error.component';
import {  AuthModule } from '../app/auth/signup/auth-module';
import {  PostModule } from '../app/formPost/post-module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    BodyComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    AuthModule,
    PostModule
  ],
  providers: [{provide : HTTP_INTERCEPTORS,useClass : AuthInterceptor,multi:true},
    {provide : HTTP_INTERCEPTORS,useClass : ErrorInterceptor,multi:true}
],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }

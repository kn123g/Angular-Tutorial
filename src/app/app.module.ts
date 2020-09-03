import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import{HeaderComponent} from '../header.component/header.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { BodyComponent } from './body.component/body.component';
import { CardComponent } from './card/card.component';
import { PostComponent } from './post/post.component';
import { FormPostComponent } from './formPost/post/post.component';
import { FormImagePostComponent } from './formPost/postWImage/post.image.component';
import { FormCardComponent } from './formPost/card/card.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ReactiveCardComponent } from './formPost/reactive-card/reactive-card.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {LoginComponent} from './auth/login/login.component';
import{SignupComponent} from './auth/signup/signup.component';
import {AuthInterceptor} from "./auth/signup/auth-interceptor";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    BodyComponent, 
    CardComponent, 
    PostComponent,
    FormCardComponent,
    FormPostComponent, 
    ReactiveCardComponent,
    FormImagePostComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginatorModule

  ],
  providers: [{provide : HTTP_INTERCEPTORS,useClass : AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

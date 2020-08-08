import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
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
import { CardComponent } from './card/card.component';
import { PostComponent } from './post/post.component';
import { FormPostComponent } from './formPost/post/post.component';
import { FormCardComponent } from './formPost/card/card.component';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
  declarations: [
    AppComponent,HeaderComponent, BodyComponent, CardComponent, PostComponent,FormCardComponent,FormPostComponent
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
MatIconModule,
MatExpansionModule,
HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

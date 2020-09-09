import { NgModule } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { PostComponent } from '../post/post.component';
import { FormPostComponent } from '../formPost/post/post.component';
import { FormImagePostComponent } from './postWImage/post.image.component';
import { FormCardComponent } from './card/card.component';
import { ReactiveCardComponent } from './reactive-card/reactive-card.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {  AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule( {
    declarations: [
        CardComponent, 
        PostComponent,
        FormCardComponent,
        FormPostComponent, 
        ReactiveCardComponent,
        FormImagePostComponent],
    imports : [
        ReactiveFormsModule,
        FormsModule,
        AngularMaterialModule,
        CommonModule,
        RouterModule
    ],
    exports : [
        ReactiveFormsModule,
        FormsModule,
        AngularMaterialModule,
        CommonModule, 
        CardComponent, 
        PostComponent,
        FormCardComponent,
        FormPostComponent, 
        ReactiveCardComponent,
        FormImagePostComponent,
        RouterModule
    ]
    
})
export class PostModule {

 
}
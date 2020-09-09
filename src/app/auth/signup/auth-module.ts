import {LoginComponent} from '../login/login.component';
import{SignupComponent} from './signup.component';
import{NgModule} from '@angular/core';
import { CommonModule } from "@angular/common";
import {  AngularMaterialModule } from '../../angular-material.module';
import {FormsModule} from '@angular/forms';
import { AuthRoutingModule} from './auth-routing.module';

@NgModule({

    declarations : [LoginComponent,SignupComponent],
    imports:[AngularMaterialModule,CommonModule,FormsModule,AuthRoutingModule],
    exports :[AngularMaterialModule,CommonModule,FormsModule,AuthRoutingModule,LoginComponent,SignupComponent]
})
export class AuthModule {


}
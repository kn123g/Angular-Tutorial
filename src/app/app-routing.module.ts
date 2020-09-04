import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormCardComponent} from './formPost/card/card.component';
import {FormPostComponent} from './formPost/post/post.component';
import {BodyComponent} from './body.component/body.component';
import {ReactiveCardComponent} from './formPost/reactive-card/reactive-card.component';
import {FormImagePostComponent} from './formPost/postWImage/post.image.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent}from './auth/signup/signup.component';
import {AuthGuard} from './auth/signup/auth-guard';
const routes: Routes = [
  {path : 'home',component : BodyComponent},
  {path : 'create',component : FormCardComponent, canActivate: [AuthGuard]},
  {path : 'message',component : FormPostComponent},
  {path : 'edit/:postId',component : FormCardComponent, canActivate: [AuthGuard]},
  {path : 'edit/reactive/:postId',component : ReactiveCardComponent, canActivate: [AuthGuard]},
  {path : 'reactivePostCreate',component : ReactiveCardComponent, canActivate: [AuthGuard]},
  //{path : 'reactivePostCreate/:postId',component : ReactiveCardComponent},
  {path : 'message-image',component : FormImagePostComponent},
  {path : 'login',component : LoginComponent},
  {path : 'signup',component : SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }

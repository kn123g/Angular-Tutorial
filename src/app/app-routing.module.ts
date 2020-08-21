import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormCardComponent} from './formPost/card/card.component';
import {FormPostComponent} from './formPost/post/post.component';
import {BodyComponent} from './body.component/body.component';
import {ReactiveCardComponent} from './formPost/reactive-card/reactive-card.component';
import {FormImagePostComponent} from './formPost/postWImage/post.image.component';
const routes: Routes = [
  {path : 'home',component : BodyComponent},
  {path : 'create',component : FormCardComponent},
  {path : 'message',component : FormPostComponent},
  {path : 'edit/:postId',component : FormCardComponent},
  {path : 'edit/reactive/:postId',component : ReactiveCardComponent},
  {path : 'reactivePostCreate',component : ReactiveCardComponent},
  {path : 'reactivePostCreate/:postId',component : ReactiveCardComponent},
  {path : 'message-image',component : FormImagePostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

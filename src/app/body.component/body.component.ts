import { Component,NgModule } from '@angular/core';
import {Post} from '../post/post.model';




@Component({
  selector: 'Body-Component',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})


export class BodyComponent {
post : Post[] = [];

  receviedPost(rPost)
  {
    this.post.push(rPost);
    console.log(rPost);
  }

}

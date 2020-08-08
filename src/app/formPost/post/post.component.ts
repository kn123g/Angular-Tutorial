import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import {Post} from '../../post/post.model';
import {PostService} from '../post.service';
import {Subscription} from "rxjs";
@Component({
  selector: 'app-form-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class FormPostComponent implements OnInit, OnDestroy {

  panelOpenState=false;
   posts : Post[] = [];
   private postsub : Subscription;
   constructor(public postservice:PostService) { //public postservice:PostService (public creates property and assign incoming value)

   }

  ngOnInit() :void {
     this.postservice.getPost();
     this.postsub=  this.postservice.getPosUpdatedListener()
      .subscribe((posts:Post[])=>{
          this.posts = posts;
          console.log(this.posts);
      });
  }
  ngOnDestroy():void{
    this.postsub.unsubscribe;
  }

}

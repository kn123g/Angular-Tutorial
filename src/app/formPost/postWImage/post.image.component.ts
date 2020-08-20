import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import {PostImage} from './post.image.model';
import {PostService} from '../post.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-form-image-post',
  templateUrl: './post.image.component.html',
  styleUrls: ['./post.image.component.css']
})
export class FormImagePostComponent implements OnInit, OnDestroy {

  panelOpenState=false;
   posts : PostImage[] = [];
   private postsub : Subscription;
   public isLoading = true;

   constructor(public postservice:PostService) { //public postservice:PostService (public creates property and assign incoming value)

   }

  ngOnInit() :void {

     this.postservice.getPostImage();
     this.postsub=  this.postservice.getPosImageUpdatedListener()
      .subscribe((posts:PostImage[])=>{
          this.posts = posts;
          console.log(this.posts);
          this.isLoading = false;
      });
  }
  onDelete(postid : string){
    console.log("post.component => trying delete")
    this.postservice.deletePostImage(postid);
  }
  ngOnDestroy():void{
    this.postsub.unsubscribe;
  }

}

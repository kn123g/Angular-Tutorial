import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import {PostImage} from './post.image.model';
import {PostService} from '../post.service';
import {Subscription} from "rxjs";
import { PageEvent } from '@angular/material/paginator';

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
   public totalPost ;
   public postPerPage = 1;
   public pageSizeOption=[1, 2, 3, 4];
   public currentPage = 1;
   constructor(public postservice:PostService) { //public postservice:PostService (public creates property and assign incoming value)

   }

  ngOnInit() :void {

     this.postservice.getPostImage(this.postPerPage, this.currentPage);
     this.postsub=  this.postservice.getPosImageUpdatedListener()
     .subscribe((posts: {Post: PostImage[], postCount: number}) => {
          this.posts = posts.Post;
          this.totalPost = posts.postCount;
          console.log("post.image.component" + this.posts);
          this.isLoading = false;
      });
      console.log(this.posts);
  }
  onDelete(postid : string){
    this.isLoading = true;
    console.log("post.component => trying delete")
    this.postservice.deletePostImage(postid).subscribe(()=>
    {
      this.postservice.getPostImage(this.postPerPage,this.currentPage);
    });
  }
  ngOnDestroy():void{
    this.postsub.unsubscribe;
  }
  onPageChange(pageData : PageEvent){
    this.isLoading = true;
    console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postservice.getPostImage(this.postPerPage,  this.currentPage);

  }
}

import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import {PostImage} from './post.image.model';
import {PostService} from '../post.service';
import {Subscription} from "rxjs";
import { PageEvent } from '@angular/material/paginator';
import {AuthService} from "../../auth/signup/auth.service";


@Component({
  selector: 'app-form-image-post',
  templateUrl: './post.image.component.html',
  styleUrls: ['./post.image.component.css']
})
export class FormImagePostComponent implements OnInit, OnDestroy {

  
  panelOpenState=false;
  userId  : string;
   posts : PostImage[] = [];
   private postsub : Subscription;
   private authListenerSubs : Subscription;
   userAuthentication = false;
   public isLoading = true;
   public totalPost ;
   public postPerPage = 1;
   public pageSizeOption=[1, 2, 3, 4];
   public currentPage = 1;
   constructor(public postservice:PostService,public authService: AuthService) { //public postservice:PostService (public creates property and assign incoming value)

   }

  ngOnInit() :void {

     this.postservice.getPostImage(this.postPerPage, this.currentPage);
     this.userId= this.authService.getUserId();
     this.postsub=  this.postservice.getPosImageUpdatedListener()
     .subscribe((posts: {Post: PostImage[], postCount: number}) => {
          this.posts = posts.Post;
          this.totalPost = posts.postCount;
          console.log("post.image.component" + this.posts);
          this.isLoading = false;
      });
      this.userAuthentication = this.authService.getUserAuthentication();
      this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated =>{
        this.userAuthentication = isAuthenticated; 
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
    this.authListenerSubs.unsubscribe();
  }
  onPageChange(pageData : PageEvent){
    this.isLoading = true;
    console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postservice.getPostImage(this.postPerPage,  this.currentPage);
   
  }
}

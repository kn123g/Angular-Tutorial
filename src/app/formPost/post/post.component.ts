import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import {Post} from '../../post/post.model';
import {PostService} from '../post.service';
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/signup/auth.service";


@Component({
  selector: 'app-form-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class FormPostComponent implements OnInit, OnDestroy {

  panelOpenState=false;
   posts : Post[] = [];
   private postsub : Subscription;
   private authListenerSubs : Subscription;
   userAuthentication = false;
   public isLoading = true;

   constructor(public postservice:PostService,public authService: AuthService) { //public postservice:PostService (public creates property and assign incoming value)

   }

  ngOnInit() :void {

     this.postservice.getPost();
     this.postsub=  this.postservice.getPosUpdatedListener()
      .subscribe((posts:Post[])=>{
          this.posts = posts;
          this.isLoading = false;
      });
      this.userAuthentication = this.authService.getUserAuthentication();
     this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated =>{
        this.userAuthentication = isAuthenticated; 
      });
  }
  onDelete(postid : string){
    console.log("post.component => trying delete")
    this.postservice.deletePost(postid);
  }
  ngOnDestroy():void{
    this.postsub.unsubscribe;
    this.authListenerSubs.unsubscribe();
  }

}

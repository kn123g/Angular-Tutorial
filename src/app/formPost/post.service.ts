import {Post} from '../post/post.model';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn : 'root'}) //injected to root app module
export class PostService{
  private posts : Post[] =[];
  private postUpdated  = new Subject<Post[]>();

  constructor(private http:HttpClient){}
  getPost(){
    //return [...this.posts]; ///copying array//return [...this.posts]; -> this pass reference address
    this.http.get<{message:string,posts:Post[]}>('http://localhost:3000/api/posts').
    subscribe((postsData)=>{
        this.posts = postsData.posts;
        this.postUpdated.next([...this.posts]);
    });
  }
  getPosUpdatedListener(){
    return this.postUpdated.asObservable();
  }
  addPost(title :string ,content :string){
      const post : Post = {id:null,title : title,content:content};

      this.http.post<{message:string}>('http://localhost:3000/api/posts',post).
      subscribe((responseData)=>{
        console.log("posted");
          console.log(responseData.message);
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
      });

  }
}

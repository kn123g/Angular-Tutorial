import {Post} from '../post/post.model';
import {PostImage} from './postWImage/post.image.model';
import { Injectable } from '@angular/core';
import {Subject,Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Router } from "@angular/router";

@Injectable({providedIn : 'root'}) //injected to root app module
export class PostService{
  private posts : Post[] =[];
  private postUpdated  = new Subject<Post[]>();

  private postsImage : Post[] =[];
  private postImageUpdated  = new Subject<Post[]>();

  constructor(private http:HttpClient,public route : Router){}

  getPost(){
    //return [...this.posts]; ///copying array//return [...this.posts]; -> this pass reference address
    this.http.get<{message:string,posts:any[]}>('http://localhost:3000/api/posts').
    pipe(map((postsData)=>{
          return postsData.posts.map(post=>{
            return {
              id:post._id,
              title:post.title,
              content:post.content
            }
          })
    })).
    subscribe((tranformedPostsData)=>{
        this.posts = tranformedPostsData;
        this.postUpdated.next([...this.posts]);
    });
  }
  getPosUpdatedListener(){
    return this.postUpdated.asObservable();
  }

  getPostForEdit(id: string) {

    return this.http.get<{ id: string; title: string; content: string }>(
      "http://localhost:3000/api/posts/edit/" + id
    );
  }
  addPost(title :string ,content :string){
      const post : Post = {id:null,title : title,content:content};
      console.log("post.service.ts => posting data   " + post.title + "   " +post.content);
      this.http.post<{message:string,id:string}>('http://localhost:3000/api/posts',post).
      subscribe((responseData)=>{
          console.log("posted");
          console.log(responseData.message);
          post.id= responseData.id;
          this.posts.push(post);
          this.postUpdated.next([...this.posts]);
          this.route.navigate(["/message"]);
      });

  }
  deletePost(postid:string){
    console.log("app.js => deleting uuid: " +postid);
    console.log("http://localhost:3000/api/posts/" + postid);
    this.http.delete("http://localhost:3000/api/posts/" + postid).subscribe(()=>{
        const updatedPosts = this.posts.filter(post=> post.id!== postid);
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }
  deletePostImage(postid:string){
    console.log("app.js => deleting uuid: " +postid);
    console.log("http://localhost:3000/api/posts/image/" + postid);
    this.http.delete("http://localhost:3000/api/posts/image/" + postid).subscribe(()=>{
        const updatedPosts = this.postsImage.filter(post=> post.id!== postid);
        this.postsImage = updatedPosts;
        this.postImageUpdated.next([...this.postsImage]);
      });
  }
  updatePost(id:string ,title :string ,content :string){
    const post : Post = {id:id,title : title,content:content};
    console.log("post.service.ts => updating data   " + post.title + "   " +post.content);
    this.http.put<{message:string}>('http://localhost:3000/api/posts/' + id,post).
    subscribe((responseData)=>{
        console.log("post.service = > updating");
        console.log(responseData.message);
        const updatedPost = [...this.posts];
        const oldestPost = updatedPost.findIndex (p=> p.id ===post.id);
        updatedPost[oldestPost] = post;
        this.posts=updatedPost;
        this.postUpdated.next([...this.posts]);
        console.log(this.posts);
        this.route.navigate(["/message"]);
    });

}
addReactivePost(title :string ,content :string,image : File){
  const postData = new FormData();
  postData.append("title",title);
  postData.append("content",content);
  postData.append("image",image);
  console.log("post.service.ts => posting data   " + title + "   " + content);
  console.log(image);
  this.http.
  post<{message:string,post:any}>('http://localhost:3000/api/posts/reactive/',postData).
  subscribe((responseDataReactive)=>{
      console.log("posted");
      console.log(responseDataReactive.message);
      const post : PostImage = {id:responseDataReactive.post.id,
        title:responseDataReactive.post.title,
        content:responseDataReactive.post.content,
        image:responseDataReactive.post.image};
      this.postsImage.push(post);
      this.postImageUpdated.next([...this.postsImage]);
      this.route.navigate(["/message-image"]);
  });

}
updateReactivePost(id:string ,title :string ,content :string,image : File){
  const post : Post = {id:id,title : title,content:content};
  console.log("post.service.ts => updating data   " + post.title + "   " +post.content);
  this.http.put<{message:string}>('http://localhost:3000/api/posts/reactive/' + id,post).
  subscribe((responseData)=>{
      console.log("post.service = > updating");
      console.log(responseData.message);
      const updatedPost = [...this.posts];
      const oldestPost = updatedPost.findIndex (p=> p.id ===post.id);
      updatedPost[oldestPost] = post;
      this.posts=updatedPost;
      this.postUpdated.next([...this.posts]);
      console.log(this.posts);
      this.route.navigate(["/message-image"]);
  });

}

getPostImage(){
  //return [...this.posts]; ///copying array//return [...this.posts]; -> this pass reference address
  this.http.get<{message:string,posts:any[]}>('http://localhost:3000/api/posts/image').
  pipe(map((postsData)=>{
        return postsData.posts.map(post=>{
          return {
            id:post._id,
            title:post.title,
            content:post.content,
            image:post.image
          }
        })
  })).
  subscribe((tranformedPostsData)=>{
      this.postsImage = tranformedPostsData;
      this.postImageUpdated.next([...this.postsImage]);
  });
}
getPosImageUpdatedListener(){
  return this.postImageUpdated.asObservable();
}

}

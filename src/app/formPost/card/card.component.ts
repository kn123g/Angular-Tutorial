import { Component, OnInit } from '@angular/core';
import {Post} from '../../post/post.model';
import { NgForm } from '@angular/forms';
import {PostService} from '../post.service';
import {ActivatedRoute,ParamMap,Route} from '@angular/router';
@Component({
  selector: 'app-form-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class FormCardComponent implements OnInit {

  //title = 'CardComponent';
 // postContent : string ='';
 // postTitle : string ='';
  private mode = "create";
  private postId = "";
  public post : Post ;
  public isLoading = true;



onSubmitButtonClick(cardForm:NgForm){
  if(cardForm.invalid)
  {
    return ;
  }
  if(this.mode === 'edit')
  {
    this.postService.updatePost(this.postId,cardForm.value.title,cardForm.value.content);
  }
  else{
    this.postService.addPost(cardForm.value.title,cardForm.value.content);
  }

  cardForm.resetForm();

}
  constructor(public postService :PostService,public route : ActivatedRoute ) { }
  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap : ParamMap) => {
      if(paramMap.has('postId')){
          this.mode='edit';
          this.postId = paramMap.get("postId");

          this.postService.getPostForEdit(this.postId).subscribe(receivedPost=>{
            console.log("card.component.ts => " );
            console.log(receivedPost.id);
            this.post = receivedPost;
            this.isLoading =false;
          });
      }
      else{
        this.isLoading =false;
        this.mode ='create';
        this.postId = null;
      }
    });

  }

}

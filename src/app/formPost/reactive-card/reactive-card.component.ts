import { Component, OnInit } from '@angular/core';
import {Post} from '../../post/post.model';
import { FormGroup,FormControl,FormControlName,FormControlDirective, RequiredValidator, Validators } from '@angular/forms';
import {PostService} from '../post.service';
import {ActivatedRoute,ParamMap,Route} from '@angular/router';
import { mimeType } from "./mime-type.validator";
import { Content } from '@angular/compiler/src/render3/r3_ast';
import {PostImage} from '../postWImage/post.image.model';
@Component({
  selector: 'app-reactive-card',
  templateUrl: './reactive-card.component.html',
  styleUrls: ['./reactive-card.component.css']
})
export class ReactiveCardComponent implements OnInit {
  private mode = "create";
  private postId = "";
  public post : PostImage ;
  public isLoading = true;
  public form : FormGroup;
  public imagePreview : string;



onSubmitButtonClick(){
  console.log("reactive-card.component.ts = > submitting form");
  if(this.form.invalid)
  {
    console.log("reactive-card.component.ts = > form is invalid");
    console.log("reactive-card.component.ts title: "+this.form.value.title + "content: " + this.form.value.content);
    return ;
  }
  if(this.mode === 'edit')
  {
    this.postService.updateReactivePost(this.postId,this.form.value.title,this.form.value.content,this.form.value.image);
  }
  else{
    this.postService.addReactivePost(this.form.value.title,this.form.value.content,this.form.value.image);
  }

  this.form.reset();

}
onImagePickedUp(event :Event)
{
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({image: file});
  this.form.get('image').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    console.log("reactive-component.ts => file reader result " + reader.result);
    this.imagePreview = ( reader.result as string);
  };

  reader.readAsDataURL (file);
  console.log("reactive-card.component.ts => " + file);
  console.log(this.form);
}
  constructor(public postService :PostService,public route : ActivatedRoute ) { }
  ngOnInit(): void {
      this.form = new FormGroup({
        'title': new FormControl(null,{
          validators:[Validators.required,Validators.minLength(3)]
        }),
        'content' : new FormControl(null,{
          validators:[Validators.required]}),
          'image' : new FormControl(null,{
            validators:[Validators.required],
            asyncValidators: [mimeType]})
      });
    this.route.paramMap.subscribe((paramMap : ParamMap) => {
      if(paramMap.has('postId')){
          this.mode='edit';
          this.postId = paramMap.get("postId");
          this.postService.getPostImageForEdit(this.postId).subscribe(receivedPost=>{
            console.log("card.component.ts => " + "postId: " +this.postId  );
            console.log(receivedPost);
            this.post = receivedPost;
            this.form.setValue({'title' : this.post.title,
            'content' : this.post.content,
            'image' : this.post.image});
            this.imagePreview = this.post.image;
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

import { Component, OnInit } from '@angular/core';
import {Post} from '../../post/post.model';
import { NgForm } from '@angular/forms';
import {PostService} from '../post.service';
@Component({
  selector: 'app-form-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class FormCardComponent implements OnInit {

  title = 'CardComponent';
  postContent : string ='';
  postTitle : string ='';


onSubmitButtonClick(cardForm:NgForm){
  if(cardForm.invalid)
  {
    return ;
  }

  this.postService.addPost(cardForm.value.title,cardForm.value.content);
  cardForm.resetForm();
}


  constructor(public postService :PostService ) { }

  ngOnInit(): void {
  }

}

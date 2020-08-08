import { Component,OnInit,EventEmitter, Output } from '@angular/core';
import {Post} from '../post/post.model';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Output() postSubmitter = new EventEmitter<Post>();
  title = 'CardComponent';
  message : string ='';
  twoWayBinding='';
  twoWayBindingpara = '';
  postContent : string ='';
  postTitle : string ='';

 onButtonClick(){
    this.message ="Welcome";
}
onSubmitButtonClick(){
  const post : Post = {id:null,title:this.postTitle,content:this.postContent};
  this.postSubmitter.emit(post);

}
OnTwoway()
{
this.twoWayBindingpara = this.twoWayBinding;
}

}

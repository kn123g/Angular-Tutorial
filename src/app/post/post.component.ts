import { Component, OnInit,NgModule ,Input} from '@angular/core';
import {Post} from './post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  panelOpenState=false;
 @Input() posts : Post[] = [];
  /*  posts = [{title : "First Post",content :"Hai i'm post one"},
    {title : "Second Post",content :"hi i'm post two"},
    {title : "Third Post",content :"Hi I'm post three"}];*/

  constructor() { }

  ngOnInit(): void {
  }

}

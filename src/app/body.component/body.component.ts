import { Component,NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'Body-Component',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})


export class BodyComponent {
  title = 'BodyComponent';
    message : string ='';
    twoWayBinding='';
    twoWayBindingpara = '';
  onButtonClick(){
      this.message ="welcome";
  }
  onSubmitButtonClick(){
    this.message ="Submitted";
}
OnTwoway()
{
  this.twoWayBindingpara = this.twoWayBinding;
}

}

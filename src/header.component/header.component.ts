import { Component,NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'Header-Component',
  templateUrl: './header.component.html',
  //styleUrls: ['./app.component.css']
})


export class HeaderComponent {
  title = 'HeaderComponent';
    message : string ='';
  onButtonClick(){
      this.message ="welcome";
  }
}

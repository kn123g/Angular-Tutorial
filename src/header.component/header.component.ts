import { Component,NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from "../app/auth/signup/auth.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'Header-Component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {

  private authListenerSubs : Subscription;
  userAuthentication = false;
  constructor(private authService : AuthService ){

  }
  ngOnInit(){
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated =>{
      this.userAuthentication = isAuthenticated; 
    });
  }
  ngOnDestroy(){
    this.authListenerSubs.unsubscribe(); 
  }
  onLogout(){
    this.authService.logOut();
  }


}

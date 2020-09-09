import {Component, OnInit} from "@angular/core";
import{NgForm} from "@angular/forms";
import {AuthService} from "../signup/auth.service";
@Component({
    selector: 'login-Component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  
export class LoginComponent implements OnInit{
  isLoading : boolean= false;
  constructor(public authService : AuthService){}

  ngOnInit(){
    this.authService.getAuthStatusListener().subscribe(
      authStatus => {
            console.log("signup.component => authStatus" );
            console.log(authStatus);
            if (!authStatus)
            {
              this.isLoading = false;
            }
          });
  }

  onSubmitButtonClick(loginForm:NgForm)  
  {
    if(loginForm.invalid)
    {
      return ;
    }
    else{
      this.isLoading  = true;
      this.authService.loginUser(loginForm.value.email,loginForm.value.password);
    }
  }



}
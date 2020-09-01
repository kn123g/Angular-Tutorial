import {Component} from "@angular/core";
import{NgForm} from "@angular/forms";
import {AuthService} from "../signup/auth.service";
@Component({
    selector: 'login-Component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  
export class LoginComponent {
  isLoading : boolean= false;
  constructor(public authService : AuthService){}
  onSubmitButtonClick(loginForm:NgForm)  
  {
    if(loginForm.invalid)
    {
      return ;
    }
    else{
      this.authService.loginUser(loginForm.value.email,loginForm.value.password);
    }
  }

}
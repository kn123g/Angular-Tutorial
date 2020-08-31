import {Component} from "@angular/core";
import{NgForm} from "@angular/forms";
@Component({
    selector: 'login-Component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  
export class LoginComponent {
  isLoading : boolean= false;
  onSubmitButtonClick(loginForm:NgForm)  
  {
    if(loginForm.invalid)
    {
      return ;
    }
    else{
      console.log(loginForm.value);
    }
  }

}
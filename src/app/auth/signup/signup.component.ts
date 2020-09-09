import {Component, OnInit} from "@angular/core";
import{NgForm} from "@angular/forms";
import { AuthService} from "./auth.service";
@Component({
    selector: 'signup-Component',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
  })
  
export class SignupComponent implements OnInit{
  isLoading : boolean= false;
  constructor(public authService : AuthService){

  }
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
  onSubmitButtonClick(signupForm:NgForm)  
  {
    if(signupForm.invalid)
    {
      return ;
    }
    else{
      this.isLoading  = true;
      this.authService.createUser(signupForm.value.email,signupForm.value.password);
    }
  }

}
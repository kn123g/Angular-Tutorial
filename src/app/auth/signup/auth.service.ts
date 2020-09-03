import { Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthDataModel} from "./auth.data-model";
import {Subject} from "rxjs";

@Injectable({providedIn:"root"})
export class AuthService{

    private token :string;
    private authStatusListener = new Subject<boolean>();
    userAuthentication = false;
    constructor(private http: HttpClient){}
    getToken(){
        return this.token;
    }
    getUserAuthentication(){
        return this.userAuthentication;
    }
    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }
    createUser(email : string,password :string)
    {   
        const authData : AuthDataModel = {email:email,password:password};
        this.http.post("http://localhost:3000/api/user/signup",authData).subscribe(
            response => {
               console.log(response);
      });
    }

    loginUser(email : string,password :string)
    {   
        const authData : AuthDataModel = {email:email,password:password};
        this.http.post<{token:string}>("http://localhost:3000/api/user/login",authData).subscribe(
            response => {
                console.log("auth.service.ts" + response.token);
                const token = response.token;
                this.token= token;
               
                if(token)
                {
                    this.userAuthentication = true;
                    this.authStatusListener.next(true);
                }
              
      });
    }
    logOut(){
        this.token = null;
        this.userAuthentication = false;
        this.authStatusListener.next(false);
    }
}
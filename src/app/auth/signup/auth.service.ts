import { Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthDataModel} from "./auth.data-model";
import {Subject} from "rxjs";
import {Router} from "@angular/router"

@Injectable({providedIn:"root"})
export class AuthService{

    private token :string;
    private authStatusListener = new Subject<boolean>();
    private userAuthentication = false;
    private tokenTimer: any;
    private userId : string;
    constructor(private http: HttpClient,private router : Router){}
    getToken(){
        return this.token;
    }
    getUserAuthentication(){
        return this.userAuthentication;
    }
    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }
    getUserId(){
      return this.userId;
    }
    createUser(email : string,password :string)
    {   
        const authData : AuthDataModel = {email:email,password:password};
        this.http.post<{message:string,result:{email:string,_id:string},created:boolean}>("http://localhost:3000/api/user/signup",authData).subscribe(
            response => {
               console.log("auth.service.ts : ");console.log( response  );
                if(response.created){
                 this.router.navigate(['/']);
                }
              
      });
     
    }

    loginUser(email : string,password :string)
    {   
        const authData : AuthDataModel = {email:email,password:password};
        this.http.post<{token:string,expiresIn:number,userId : string}>("http://localhost:3000/api/user/login",authData).subscribe(
            response => {
                console.log("auth.service.ts" + response.token);
                const token = response.token;
                this.token= token;
               
                if(token)
                {
                    const expiresInDuration = response.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.userAuthentication = true;
                    this.userId = response.userId;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    console.log(expirationDate);
                    this.saveAuthData(token, expirationDate,this.userId);
                    this.router.navigate(['/']);
                    
                }
              
      });
    }
    autoAuthUser() {

        const authInformation = this.getAuthData();
        console.log("auth.service.ts => autoAuthUser() : " + authInformation);
        if (!authInformation) {
          return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
          this.token = authInformation.token;
          this.userAuthentication = true;
          this.userId = authInformation.userId;
          this.setAuthTimer(expiresIn / 1000);
          this.authStatusListener.next(true);
        }
      }
    
    logOut(){
        this.token = null;
        this.userAuthentication = false;
        this.authStatusListener.next(false);
        this.authStatusListener.next(false);
        this.userId = null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }
    private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
          this.logOut();
        }, duration * 1000);
      }
    
      private saveAuthData(token: string, expirationDate: Date,userId : string) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("userId", userId);
      }
    
      private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
      }
    
      private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId  = localStorage.getItem("userId");
        if (!token || !expirationDate) {
          return;
        }
        return {
          token: token,
          expirationDate: new Date(expirationDate),
          userId : userId
        }
      }
}
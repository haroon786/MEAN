import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "../auth/auth.data";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token: string;
  private userId:string;
  private tokenTime: NodeJS.Timer;
  private isauthenticated = false;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }
  getIsauthenticated() {
    return this.isauthenticated;
  }
  getUserId()
  {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    console.log(email, password);

    const authData: AuthData = { email: email, password: password };
    this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe(() => {
          this.router.navigate["/"];
      },error=>
      {
        this.authStatusListener.next(false);
      });
  }
  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    console.log(authData);
    this.http
      .post<{ token: string; expiresIn: number,userId:string }>(
        "http://localhost:3000/api/user/login",
        authData
      )
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        console.log(response);
        if (token) {
          const expiresDuration = response.expiresIn;
          this.setAuthTimer(expiresDuration);
          this.isauthenticated = true;
          this.userId=response.userId
          this.authStatusListener.next(true);
          const now=new Date();
          const expirationDate=new Date(now.getTime()+ expiresDuration*1000);
          this.saveAuthInformation(token,expirationDate,this.userId)
          this.router.navigate(["/"]);
        }
      },error=>
      {
        this.authStatusListener.next(false)
      });
  }
  logOut() {
    this.token = null;
    this.isauthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTime);
    this.userId=null
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private saveAuthInformation(token: string, expiresDuration: Date,userId:string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expiresDuration.toISOString());
    localStorage.setItem("userId",userId)
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId")
  }

  private getAuthData()
  {
    const token=localStorage.getItem("token");
    const expirationDate=localStorage.getItem("expiration");
    const userId=localStorage.getItem("userId");
    if(!token && !expirationDate)
    {
      return;
    }
    return {
      token:token,
      expirationDate:new Date(expirationDate),
      userId:userId
    }
  }
  autoAuthUser()
  {
       const authInfo=this.getAuthData()
       if(!authInfo)
      {
        return;
      }
       const now=new Date();
       const expiresIn=authInfo.expirationDate.getTime()-now.getTime();
       if(expiresIn>0)
       {
         this.token=authInfo.token;
         this.isauthenticated=true;
         this.userId=authInfo.userId
         this.setAuthTimer(expiresIn/1000);
         this.authStatusListener.next(true);
       }
  }
  private setAuthTimer(duration:number)
  {

    this.tokenTime = setTimeout(() => {
      this.logOut();
    }, duration*1000);
  }
}

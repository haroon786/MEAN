import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthData} from '../auth/auth.data';
import { Subject } from 'rxjs';
@Injectable({
  providedIn:"root"
})
export class AuthService{
  private token:string;
  private authStatusListener=new Subject<boolean>();
  constructor(private http:HttpClient)
  {}

  getToken()
  {
    return this.token;
  }

  getAuthStatusListener()
  {
     return this.authStatusListener.asObservable()
  }

  createUser(email:string,password:string)
  {
    console.log(email,password);

      const authData:AuthData={email:email,password:password};
      this.http.post("http://localhost:3000/api/user/signup",authData)
      .subscribe(Response=>
        {
          console.log(Response);

        })
  }
  login(email:string,password:string)
  {
    const authData:AuthData={email:email,password:password};
    console.log(authData)
    this.http.post<{token:string}>("http://localhost:3000/api/user/login",authData)
    .subscribe(response=>
      {
        const  token=response.token;
        this.token=token
          console.log(response);
          this.authStatusListener.next(true);
      })
  }
}



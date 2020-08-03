import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthData} from '../auth/auth.data';
@Injectable({
  providedIn:"root"
})
export class AuthService{
  constructor(private http:HttpClient)
  {}

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
}



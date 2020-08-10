import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading=false;
  private authStatusSub:Subscription;
  constructor(public authservice:AuthService) { }

  ngOnInit() {
    this.authStatusSub=this.authservice.getAuthStatusListener().subscribe(authStatus=>
      {
          this.isLoading=false;
      }
    )
  }
  onLogin(form:NgForm)
  {
    if(form.invalid)
    {
      return null;
    }
    this.authservice.login(form.value.email,form.value.password)
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { observable, Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
  onSignup(form:NgForm)
  {
    if(form.invalid)
    {
      return null;
    }
    this.authservice.createUser(form.value.email,form.value.password)
  }
}

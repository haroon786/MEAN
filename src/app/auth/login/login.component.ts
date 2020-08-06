import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading=false;
  constructor(public authservice:AuthService) { }

  ngOnInit() {
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

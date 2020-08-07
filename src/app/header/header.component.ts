import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userAutheticated=false;
  private authListenerSubs$:Subscription;
  constructor(private authservice:AuthService) { }

  ngOnInit() {

    this.authListenerSubs$=this.authservice.getAuthStatusListener().subscribe(
      isAuthenticated=>
      {
          this.userAutheticated=isAuthenticated
      }
    )

  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../util/sidebar/sidebar.component';
import { AuthenticationService } from './authentication.service';
import { SessionService } from './../../client/util/session.service';
import { UserService } from '../user/user.service';


@Component({
  selector: 'my-authentication',
  templateUrl: './authentication/authentication.component.html',
  providers: [AuthenticationService]
})
export class AuthenticationComponent implements OnInit{ 

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    }



}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  moduleId: module.id,
  selector: 'authentication',
  templateUrl: './authentication.component.html'
})
export class AuthenticationComponent implements OnInit {

  loginForm: FormGroup;

  email = new FormControl('', [Validators.required,
  Validators.minLength(2),
  Validators.maxLength(30),
  Validators.pattern('[a-zA-Z0-9_.@\\s]*')]);

  password = new FormControl('', [Validators.required,
  Validators.minLength(6)]);

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });

  }

  authenticate() {
    this.authenticationService.authenticate(this.loginForm.value).subscribe(
      res => {
        this.router.navigate(['/']);
      },
      err => {
        console.error(err);
      }
    );
  }
}
